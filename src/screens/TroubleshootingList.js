import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Pressable, Alert, ActivityIndicator, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import supabase from "../services/supabase";

export default function TroubleshootingList() {
  const [troubleshooting, setTroubleshooting] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTroubleshooting();

    const subscription = supabase
      .channel("public:troubleshooting")
      .on("postgres_changes", { event: "*", schema: "public", table: "troubleshooting" }, () => {
        fetchTroubleshooting();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchTroubleshooting = async () => {
    try {
      const { data, error } = await supabase.from("troubleshooting").select("*");

      if (error) {
        console.error("Error obteniendo los datos:", error.message);
      } else {
        setTroubleshooting(data);
      }
    } catch (error) {
      console.error("Error en fetchTroubleshooting:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (Platform.OS === "web") {
      const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este troubleshooting?");
      if (!confirmDelete) return;
    } else {
      Alert.alert(
        "Confirmar eliminación",
        "¿Estás seguro de que quieres eliminar este troubleshooting?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Eliminar",
            onPress: async () => await deleteTroubleshooting(id),
          },
        ]
      );
      return;
    }

    await deleteTroubleshooting(id);
  };

  const deleteTroubleshooting = async (id) => {
    console.log("Intentando eliminar troubleshooting con ID:", id);
    try {
      const { error } = await supabase.from("troubleshooting").delete().eq("id", id);
      if (error) {
        Alert.alert("Error", `No se pudo eliminar el troubleshooting. ${error.message}`);
      } else {
        fetchTroubleshooting(); // Recargar la lista automáticamente
      }
    } catch (error) {
      console.error("Error inesperado:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Troubleshooting</Text>
      <FlatList
        data={troubleshooting}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("Editar", { troubleshootingId: item.id })}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.cardSubtitle}>Síntomas: {item.symptoms}</Text>
              <Text style={styles.cardSubtitle}>Solución: {item.solution}</Text>
            </TouchableOpacity>
            <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteText}>Eliminar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  cardSubtitle: { fontSize: 14, color: "gray" },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteText: { color: "white", fontWeight: "bold" },
});
