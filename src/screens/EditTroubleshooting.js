import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import supabase from "../services/supabase";

export default function EditTroubleshooting({ route, navigation }) {
  const { troubleshootingId } = route.params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [solution, setSolution] = useState("");
  const [commonErrors, setCommonErrors] = useState("");

  useEffect(() => {
    const fetchTroubleshooting = async () => {
      const { data, error } = await supabase
        .from("troubleshooting")
        .select("*")
        .eq("id", troubleshootingId)
        .single();

      if (error) {
        console.error("Error obteniendo el troubleshooting:", error);
      } else {
        setTitle(data.title);
        setDescription(data.description);
        setSymptoms(data.symptoms);
        setSolution(data.solution);
        setCommonErrors(data.common_errors);
      }
    };

    fetchTroubleshooting();
  }, [troubleshootingId]);

  const handleUpdate = async () => {
    if (!title || !description || !symptoms || !solution) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const { error } = await supabase
      .from("troubleshooting")
      .update({
        title,
        description,
        symptoms,
        solution,
        common_errors: commonErrors,
      })
      .eq("id", troubleshootingId);

    if (error) {
      console.error("Error actualizando el troubleshooting:", error);
      Alert.alert("Error", "No se pudo actualizar el troubleshooting.");
    } else {
      Alert.alert("Éxito", "Troubleshooting actualizado correctamente.");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Troubleshooting</Text>
      <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Síntomas" value={symptoms} onChangeText={setSymptoms} />
      <TextInput style={styles.input} placeholder="Solución" value={solution} onChangeText={setSolution} />
      <TextInput style={styles.input} placeholder="Errores comunes" value={commonErrors} onChangeText={setCommonErrors} />
      <Button title="Actualizar" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
