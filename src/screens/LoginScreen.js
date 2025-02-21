import { useState } from "react";
import { Platform, View, Text, TextInput, Pressable, StyleSheet, Alert, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import supabase from "../services/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      Alert.alert("Error", "No se pudo iniciar sesión.");
      console.error("Error en login:", error);
    } else {
      Alert.alert("Éxito", "Inicio de sesión exitoso.");
      console.log("Sesión iniciada:", data);

      if (Platform.OS === "web") {
        // En web, usamos reset para evitar historial innecesario
        navigation.reset({
          index: 0,
          routes: [{ name: "Troubleshooting" }],
        });
      } else {
        // En iOS y Android solo navegamos normalmente
        navigation.navigate("Troubleshooting");
      }
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>

      <Pressable style={styles.link} onPress={() => navigation.navigate("Registro")}>
        <Text style={styles.linkText}>Registrarse</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  link: { marginTop: 15, alignItems: "center" },
  linkText: { color: "#007bff", fontSize: 16, fontWeight: "bold" },
});
