import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SobreAutismoScreen({ navigation }) {
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
          <TouchableOpacity style={styles.sensorButton}onPress={() => navigation.navigate("Pulseira")}>
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
        <Text style={styles.title}>Sobre o Autismo</Text>
        <Image
          source={require("./img/informacao.png")}
          style={styles.image}
        />

        <View style={styles.card}>
          <Text style={styles.text}>
            {"\n"}• <Text style={styles.bold}>O que é o TEA?</Text>
            {"\n"}O Transtorno do Espectro Autista (TEA) é uma condição
            neurológica e do neurodesenvolvimento que afeta principalmente:
            {"\n"}{"\n"}• Comunicação (verbal e não verbal)
            {"\n"}• Interação social
            {"\n"}• Comportamento e interesses (geralmente restritos ou
            repetitivos)
            {"\n"}{"\n"}O termo “espectro” é usado porque as características
            variam muito de pessoa para pessoa — desde quadros leves até mais
            intensos.
            {"\n"}{"\n"}• <Text style={styles.bold}>Quando aparece?</Text>
            {"\n"}Os sinais geralmente surgem antes dos 3 anos de idade, mas o
            diagnóstico pode ser feito em qualquer momento da vida. Algumas
            crianças já são perceptíveis na primeira infância.
            {"\n"}{"\n"}• <Text style={styles.bold}>Tratamento e apoio:</Text>
            {"\n"}O TEA não tem cura, mas há muitas formas de apoio e
            intervenção que ajudam a melhorar a qualidade de vida.
            {"\n"}{"\n"}• Terapias comportamentais (ex: ABA — Análise do
            Comportamento Aplicada)
            {"\n"}• Fonoaudiologia (trabalho com linguagem e comunicação)
            {"\n"}• Terapia ocupacional (habilidades sociais e motoras)
            {"\n"}• Psicoterapia
            {"\n"}• Apoio educacional e social adaptado
            {"\n"}{"\n"}É essencial respeitar a individualidade da pessoa e
            potencializar suas habilidades.
          </Text>
        </View>
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
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f9f9f9ff",
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  text: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});
