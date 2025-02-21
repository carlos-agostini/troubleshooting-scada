import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import TroubleshootingList from "../screens/TroubleshootingList";
import AddTroubleshooting from "../screens/AddTroubleshooting";
import EditTroubleshooting from "../screens/EditTroubleshooting";
import { Button } from "react-native";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Troubleshooting"
          component={TroubleshootingList}
          options={({ navigation }) => ({
            headerRight: () => <Button title="Agregar" onPress={() => navigation.navigate("Agregar")} />,
          })}
        />
        <Stack.Screen name="Agregar" component={AddTroubleshooting} />
        <Stack.Screen name="Editar" component={EditTroubleshooting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
