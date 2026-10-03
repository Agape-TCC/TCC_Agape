import React from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      {/* HEADER NOVO */}
      <View style={styles.headerContainer}>
        {/* Linha de cima */}
        <View style={styles.topRow}>
          <Ionicons name="menu" size={28} color="black" />
          <TextInput style={styles.search} placeholder="O que você precisa?" />
          <TouchableOpacity style={styles.loginContainer} onPress={() => navigation.navigate("Login")}>
            <Ionicons name="person-outline" size={22} color="black" />
            <Text style={styles.loginText}>Usuário</Text>
          </TouchableOpacity>
        </View>

        {/* Linha de baixo */}
        <View style={styles.bottomRow}>
          <Image source={require("./img/logosoema.png")} style={styles.logo} />
          <Image
            source={require("./img/autismo.png")}
            style={styles.autismoImg}
          />
          <TouchableOpacity
            style={styles.sensorButton}
            onPress={() => navigation.navigate("Pulseira")}
          >
             <Text style={styles.sensorText}>Pulseira</Text>
            <Image
              source={require("./img/pulseira.png")}
              style={styles.sensorImg}
            />
           
          </TouchableOpacity>
        </View>
      </View>

      {/* BANNER */}
      <View style={styles.bannerContainer}>
        <Image
          source={require("./img/banner.png")}
          style={styles.bannerImage}
        />

        <View style={styles.bannerContent}>
          <View style={styles.bannerTextArea}>
            <Text style={styles.bannerText}>
              Comece agora a utilizar nosso ótimo site especializado em auxiliar
              famílias com filhos portadores de TEA
            </Text>

            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>COMEÇAR AGORA</Text>
            </TouchableOpacity>
          </View>

          <Image
            source={require("./img/coracao.png")}
            style={styles.heartBanner}
          />
        </View>
      </View>

      {/* Textos explicativos */}
      <View style={styles.textSection}>
        <Text style={styles.title}>
          Estratégias e métodos que o ajudarão a lidar e cuidar melhor de um
          filho portador de TEA
        </Text>
        <Text style={styles.subtitle}>
          A utilização de nosso site terá como benefício uma melhor organização
          e um auxílio a mais para ajudar famílias com filhos autistas.
        </Text>
      </View>

      {/* Cards */}
      <View style={styles.cardsContainer}>
        {/* PULSEIRA */}
        <View style={styles.card}>
          <Image
            source={require("./img/pulseira.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>PULSEIRA</Text>
          <Text style={styles.cardText}>
            A partir do exame foi diagnosticado TEA, e a pulseira auxilia na
            identificação e prevenção em casos de emergência.
          </Text>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate("Pulseira")}
          >
            <Text style={styles.cardButtonText}>Exibir</Text>
          </TouchableOpacity>
        </View>

        {/* NOTAS / AGENDA */}
        <View style={styles.card}>
          <Image
            source={require("./img/caderno.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>NOTAS/AGENDA</Text>
          <Text style={styles.cardText}>
            Uma forma organizada de anotar atividades, consultas e informações
            importantes sobre o dia do seu filho.
          </Text>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate("Note")}
          >
            <Text style={styles.cardButtonText}>Exibir</Text>
          </TouchableOpacity>
        </View>

        {/* INFORMAÇÕES */}
        <View style={styles.card}>
          <Image
            source={require("./img/puzzle.png")}
            style={styles.cardImage}
          />
          <Text style={styles.cardTitle}>INFORMAÇÕES</Text>
          <Text style={styles.cardText}>
            Você saberá tudo que está incluso nesta ferramenta, com dicas e
            orientações sobre TEA.
          </Text>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate("Info")}
          >
            <Text style={styles.cardButtonText}>Exibir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /** HEADER NOVO **/
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

  /** BANNER **/
  bannerContainer: {
    position: "relative",
    width: "100%",
    alignItems: "center",
    marginTop: 0,
  },
  bannerImage: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  bannerContent: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  bannerTextArea: {
    flex: 1,
    paddingRight: 10,
  },
  bannerText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "50",
    textAlign: "justify",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  bannerButton: {
    backgroundColor: "#4B2EFF",
    height: 25,
    borderRadius: 10,
    paddingHorizontal: 3,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginLeft: 40,
    marginBottom: 20,
  },
  bannerButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  heartBanner: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  /** TEXTOS E CARDS **/
  textSection: {
    paddingHorizontal: 25,
    marginVertical: 25,
      textAlign: "justify",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 8,
     textAlign: "justify",
      marginHorizontal: 20,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 13,
    color: "#444",
     textAlign: "justify",
     marginHorizontal: 20,
  },
  cardsContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  card: {
    width: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 10,
  },
  cardTitle: {
    color: "#1e50ff",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 6,
  },
  cardText: {
    textAlign: "center",
    color: "#444",
    fontSize: 13,
    marginBottom: 12,
    textAlign: "justify",
    marginHorizontal: 25,
  },
  cardButton: {
    backgroundColor: "#1e50ff",
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 8,
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});