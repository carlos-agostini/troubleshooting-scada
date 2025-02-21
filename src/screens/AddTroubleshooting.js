import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import supabase from "../services/supabase";

export default function AddTroubleshooting({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [solution, setSolution] = useState("");
  const [commonErrors, setCommonErrors] = useState("");

  const handleAddTroubleshooting = async () => {
    if (!title || !description || !symptoms || !solution) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const { error } = await supabase.from("troubleshooting").insert([
      {
        title,
        description,
        symptoms,
        solution,
        common_errors: commonErrors,
      },
    ]);

    if (error) {
      console.error("Error al agregar troubleshooting:", error);
      Alert.alert("Error", "No se pudo agregar el troubleshooting.");
    } else {
      Alert.alert("Éxito", "Troubleshooting agregado correctamente.");
      navigation.goBack(); // Volver a la lista
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Troubleshooting</Text>
      <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Síntomas" value={symptoms} onChangeText={setSymptoms} />
      <TextInput style={styles.input} placeholder="Solución" value={solution} onChangeText={setSolution} />
      <TextInput style={styles.input} placeholder="Errores comunes" value={commonErrors} onChangeText={setCommonErrors} />
      <Button title="Agregar" onPress={handleAddTroubleshooting} />
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
