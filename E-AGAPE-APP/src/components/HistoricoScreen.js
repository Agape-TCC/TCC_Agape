import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState([]);

  async function carregarHistorico() {
    try {
      const usuarioLogado = await AsyncStorage.getItem("usuarioLogado");
      if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);

        const response = await fetch(
          `http://192.168.0.171:9090/dados-pulseira/usuario/${usuario.id}`
        );
        const data = await response.json();

        // Ordena por timestamp decrescente
        const ordenado = data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setHistorico(ordenado);
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    }
  }

  // Carrega ao abrir a tela
  useEffect(() => {
    carregarHistorico();
  }, []);

  const renderItem = ({ item }) => {
    const ts = new Date(item.timestamp).toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "medium",
    });

    return (
      <View style={styles.item}>
        <Text style={styles.bpm}>❤️ BPM: {item.bpm}</Text>
        <Text style={styles.timestamp}>⏰ {ts}</Text>
        <Text style={styles.usuario}>👤 Usuário ID: {item.usuario?.id}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}> Histórico da Pulseira</Text>

      {/* Botão de atualizar logo abaixo do título */}
      <TouchableOpacity style={styles.refreshButton} onPress={carregarHistorico}>
        <Text style={styles.refreshText}> Atualizar</Text>
      </TouchableOpacity>

      {/* Lista */}
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8, textAlign: "center" },
  refreshButton: {
    alignSelf: "center",
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 12,
  },
  refreshText: { color: "#fff", fontWeight: "bold" },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  bpm: { fontSize: 18, fontWeight: "bold", color: "#e63946" },
  timestamp: { fontSize: 14, color: "#555" },
  usuario: { fontSize: 14, color: "#333" },
});
