import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import supabase from "../services/auth";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      Alert.alert("Error", "No se pudo registrar.");
      console.error("Error en registro:", error);
    } else {
      Alert.alert("Éxito", "Registro exitoso. Verifica tu correo.");
      navigation.replace("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} />
      
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </Pressable>

      <Pressable style={styles.link} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Volver a Login</Text>
      </Pressable>
    </View>
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
