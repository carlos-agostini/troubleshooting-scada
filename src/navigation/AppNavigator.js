import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TroubleshootingList from "../screens/TroubleshootingList";
import AddTroubleshooting from "../screens/AddTroubleshooting";
import EditTroubleshooting from "../screens/EditTroubleshooting";
import { Pressable, Text, View, StyleSheet, ActivityIndicator, Platform } from "react-native";
import supabase from "../services/auth";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Sesión obtenida:", data.session);
      setSession(data.session);
      setLoading(false);
    };

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Cambio en la sesión:", session);
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!session ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Registro" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Troubleshooting"
              component={TroubleshootingList}
              options={({ navigation }) => ({
                headerTitleAlign: "center",
                headerRight: () => (
                  <View style={styles.headerButtonsContainer}>
                    <Pressable style={styles.headerButton} onPress={() => navigation.navigate("Agregar")}>
                      <Text style={styles.headerButtonText}>＋</Text>
                    </Pressable>
                    <Pressable
                      style={styles.headerButton}
                      onPress={async () => {
                        await supabase.auth.signOut();
                        setSession(null);

                        if (Platform.OS === "web") {
                          navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                          });
                        } else {
                          navigation.navigate("Login");
                        }
                      }}
                    >
                      <Text style={[styles.headerButtonText, { color: "red" }]}>⏻</Text>
                    </Pressable>
                  </View>
                ),
              })}
            />
            <Stack.Screen name="Agregar" component={AddTroubleshooting} />
            <Stack.Screen name="Editar" component={EditTroubleshooting} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  headerButton: {
    padding: 10,
    marginHorizontal: 5,
  },
  headerButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007bff",
  },
});
