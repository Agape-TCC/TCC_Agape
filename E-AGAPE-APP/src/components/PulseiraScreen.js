import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BleManager } from "react-native-ble-plx";
import { Buffer } from "buffer";
import AsyncStorage from "@react-native-async-storage/async-storage"; // 👈 Import para pegar usuário logado

export default function PulseiraScreen({ navigation }) {
  const [bpm, setBpm] = useState(75);
  const manager = new BleManager();

  useEffect(() => {
    async function requestPermissions() {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);
      }
    }

    async function connectBLE() {
      try {
        await requestPermissions();

        console.log("🔍 Iniciando varredura BLE...");

        manager.startDeviceScan(null, null, async (error, device) => {
          if (error) {
            console.error("Erro BLE:", error);
            return;
          }

          if (device?.name?.includes("ESP32_Hub")) {
            console.log("📡 Dispositivo encontrado:", device.name);

            manager.stopDeviceScan();

            const connectedDevice = await device.connect();
            console.log("✅ Conectado a:", connectedDevice.name);

            await connectedDevice.discoverAllServicesAndCharacteristics();

            const SERVICE_UUID = "5bc28d32-1fb5-459e-8fcc-c5c9c331914b";
            const CHARACTERISTIC_UUID = "abc5483e-36e1-4688-b7f5-ea07361b26a8";

            connectedDevice.monitorCharacteristicForService(
              SERVICE_UUID,
              CHARACTERISTIC_UUID,
              async (error, characteristic) => {
                if (error) {
                  console.error("Erro de notificação:", error);
                  return;
                }

                if (characteristic?.value) {
                  const newData = Buffer.from(
                    characteristic.value,
                    "base64"
                  ).readUInt8(0);

                  console.log("🔔 Notificação recebida:", newData);
                  setBpm(newData || 75);

                  // 🚀 Pega usuário logado do AsyncStorage
                  try {
                    const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
                    if (usuarioLogado) {
                      const usuario = JSON.parse(usuarioLogado);

                      // ⚡ Só envia se BPM > 70
                      if (newData > 70) {
                        fetch("http://192.168.0.171:9090/dados-pulseira", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            bpm: newData,
                            usuario: { id: usuario.id }, // 👈 usa o id do usuário logado
                          }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            // 🔧 Formata timestamp para data/hora legível
                            const ts = new Date(data.timestamp);
                            const formatado = ts.toLocaleString("pt-BR", {
                              dateStyle: "short",
                              timeStyle: "medium",
                            });

                            console.log(
                              `📡 Batimento salvo: BPM=${data.bpm}, Id=${data.usuario.id}, Timestamp=${formatado}`
                            );
                          })
                          .catch((err) =>
                            console.error("Erro ao salvar batimento:", err)
                          );
                      }
                    } else {
                      console.warn("⚠️ Nenhum usuário logado encontrado no AsyncStorage");
                    }
                  } catch (err) {
                    console.error("Erro ao recuperar usuário logado:", err);
                  }
                }
              }
            );
          }
        });
      } catch (error) {
        console.error("Erro BLE:", error);
      }
    }

    connectBLE();

    return () => {
      console.log("🧹 Limpando conexão BLE...");
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Ionicons name="menu" size={28} color="black" />
          <TextInput style={styles.search} placeholder="O que você precisa?" />
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons name="person-outline" size={22} color="black" />
            <Text style={styles.loginText}>Usuário</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <Image source={require("./img/logosoema.png")} style={styles.logo} />
          <Image source={require("./img/autismo.png")} style={styles.autismoImg} />
          <TouchableOpacity style={styles.sensorButton}>
            <Text style={styles.sensorText}>Pulseira</Text>
            <Image source={require("./img/pulseira.png")} style={styles.sensorImg} />
          </TouchableOpacity>
        </View>
      </View>

      {/* CARD PRINCIPAL */}
      <View style={styles.card}>
        <Text style={styles.pulseiraText}>Pulseira: 2</Text>
        <Image source={require("./img/pulseira.png")} style={styles.image} />

        <Text style={styles.bpmLabel}>BPM:</Text>
        <View style={styles.bpmBox}>
          <Text style={styles.bpmNumber}>{bpm}</Text>
          <Text style={styles.bpmUnit}>BPM</Text>
        </View>

        <View style={styles.alertContainer}>
          <Text style={styles.alertLabel}>Situação atual:</Text>
          <View style={styles.status}>
            <View
              style={[
                styles.alertDot,
                {
                  backgroundColor:
                    bpm < 80
                      ? "#00ff00"
                      : bpm < 100
                      ? "#ffff00"
                      : bpm < 120
                      ? "#800080"
                      : "#ff0000",
                },
              ]}
            />
            <Text style={styles.alertText}>
              {bpm < 80
                ? "Estável"
                : bpm < 100
                ? "Moderado"
                : bpm < 120
                ? "Alerta"
                : "Grave"}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Historico")}>
          <Text style={styles.buttonText}>Histórico da pulseira</Text>
        </TouchableOpacity>

      </View>

      {/* COMO FUNCIONA */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Como funciona?</Text>
        <Text style={styles.infoText}>
          {"\u2022"} Cada pulseira tem funções diferentes, a pulseira 1 será
          utilizada pelo cuidador de TEA enquanto a segunda pelo responsável.
        </Text>
        <Text style={styles.infoText}>
          {"\u2022"} Assim esse dispositivo tem o objetivo de ler os batimentos
          cardíacos do usuário e assim prever crises de ansiedade onde,
          dependendo da quantidade de bpm, ela mostra sinais diferentes.
        </Text>
        <Text style={styles.infoText}>
          {"\u2022"} Referente a quantos bpm o batimento cardíaco do filho
          apresentar, os seguintes leds irão ligar:
        </Text>

        <View style={styles.legenda}>
          <Text style={styles.legendaItem}>🟢 VERDE = 60 ~ 80 → Estável</Text>
          <Text style={styles.legendaItem}>🟡 AMARELO = 80 ~ 100 → Moderado</Text>
          <Text style={styles.legendaItem}>🟣 ROXO = 100 ~ 120 → Alerta</Text>
          <Text style={styles.legendaItem}>🔴 VERMELHO = 120 ~ → Grave</Text>
        </View>

        <Text style={styles.infoText}>O apto liga quando:</Text>
        <Text style={styles.infoText}>BPM da pulseira 1 ≥ 120 ...</Text>
        <Text style={styles.infoText}>Na pulseira: 2</Text>
        <Text style={styles.infoText}>LED Azul liga quando:</Text>
        <Text style={styles.infoText}>BPM da pulseira ≥ 120 ...</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },

  /* HEADER */
  header: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#16355D",
    marginBottom: 15,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  search: {
    flex: 1,
    height: 39,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 30,
    paddingHorizontal: 10,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  loginText: {
    color: "#0028A5",
    marginLeft: 5,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
  autismoImg: {
    width: 130,
    height: 50,
    resizeMode: "contain",
  },
  sensorButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0028A5",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  sensorImg: {
    width: 38,
    height: 30,
    marginLeft: 6,
  },
  sensorText: {
    color: "#0028A5",
  },

  /* CONTEÚDO PRINCIPAL */
  card: {
    backgroundColor: "#ffffffff",
    marginTop: 10,
    borderRadius: 12,
    borderColor: "#474747ff",
    borderWidth: 2,
    padding: 20,
    alignItems: "center",
    marginHorizontal: 50,
  },
  pulseiraText: {
    color: "#000000ff",
    fontSize: 18,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
  },
  bpmLabel: {
    color: "#000000ff",
    fontSize: 16,
    marginBottom: 5,
  },
  bpmBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 15,
  },
  bpmNumber: {
    color: "#00ff7f",
    fontSize: 40,
    fontWeight: "bold",
  },
  bpmUnit: {
    color: "#ff4040",
    fontSize: 18,
    marginLeft: 5,
  },
  alertContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  alertLabel: {
    color: "#000000ff",
    fontSize: 14,
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  alertDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#b23bff",
    marginRight: 5,
  },
  alertText: {
    color: "#000000ff",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#005DFF",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: "#f4f4f4",
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 30,
    marginHorizontal: 40,
    borderRadius: 10,
    padding: 15,
    marginBottom: 60,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    textAlign: "justify",
  },
  legenda: {
    marginVertical: 10,
  },
  legendaItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
});