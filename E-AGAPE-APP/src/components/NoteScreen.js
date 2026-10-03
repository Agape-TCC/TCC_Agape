import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NotasAgendaScreen({ navigation }) {
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        {/* Linha de cima */}
        <View style={styles.topRow}>
          <Ionicons name="menu" size={28} color="black" />
          <TextInput
            style={styles.search}
            placeholder="O que você precisa?"
          />
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons name="person-outline" size={22} color="black" />
            <Text style={styles.loginText}>Usuario</Text>
          </TouchableOpacity>
        </View>

        {/* Linha de baixo */}
        <View style={styles.bottomRow}>
          <Image
            source={require("./img/logosoema.png")}
            style={styles.logo}
          />
          <Image
            source={require("./img/autismo.png")}
            style={styles.autismoImg}
          />
          <TouchableOpacity style={styles.sensorButton} onPress={() => navigation.navigate("Pulseira")}>
            <Text style={styles.sensorText}>Pulseira</Text>
            <Image
              source={require("./img/pulseira.png")}
              style={styles.sensorImg}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.title}>Notas & Agenda</Text>
        <Text style={styles.date}>{dataAtual}</Text>

        {/* Agenda */}
        <View style={styles.agendaCard}>
          <ScrollView>
            {["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map(
              (hora, index) => (
                <Text key={index} style={styles.agendaItem}>
                  {hora}
                </Text>
              )
            )}
          </ScrollView>
        </View>

        {/* Botões */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="document-text-outline" size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.circleButton}>
            <Ionicons name="add-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Notas */}
        <Text style={styles.sectionTitle}>Notas</Text>
        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Nota de Hoje:</Text>
          <Text style={styles.noteText}>
            Hoje me senti mais confiante durante a sessão de terapia. Consegui
            explicar melhor meus pensamentos e percebi que pequenas rotinas me
            ajudam a manter a calma.
          </Text>
          <Text style={styles.pagination}>1/1</Text>
        </View>
      </View>
    </ScrollView>
  );
}

/* ===================== ESTILOS ===================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },

  /* HEADER */
  headerContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#16355D",
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

  /* CONTEÚDO */
  content: {
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0028A5",
    marginVertical: 16,
  },
  date: {
    fontSize: 14,
    color: "#333",
    marginBottom: 12,
  },
  agendaCard: {
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    width: "70%",
    height: 180,
    marginBottom: 16,
  },
  agendaItem: {
    fontSize: 15,
    color: "#333",
    marginVertical: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    marginBottom: 24,
  },
  circleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#16355D",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  noteTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  noteText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  pagination: {
    textAlign: "center",
    color: "#555",
    marginTop: 8,
  },
});
