# PROJETO ÁGAPE — Monitoramento Cardíaco e Suporte para Autismo Grau 3

🌐 **Landing Page Oficial:** [https://agape-tcc.github.io/TCC_Agape/](https://agape-tcc.github.io/TCC_Agape/)

---

## 📋 Índice

1. [Resumo Oficial e Sobre o Projeto](#1-resumo-oficial-e-sobre-o-projeto)
2. [Objetivos e Resultados Esperados](#2-objetivos-e-resultados-esperados)
3. [Metodologia, Estudo de Caso e Público-Alvo](#3-metodologia-estudo-de-caso-e-público-alvo)
4. [Sistema Dual de Pulseiras e Lógica de Alertas](#4-sistema-dual-de-pulseiras-e-lógica-de-alertas)
5. [Estrutura do Repositório](#5-estrutura-do-repositório)
6. [Tecnologias Utilizadas](#6-tecnologias-utilizadas)
7. [Como Executar o Projeto (Guia Técnico)](#7-como-executar-o-projeto-guia-técnico)
   * [7.1 Backend (API REST)](#71-backend-api-rest)
   * [7.2 Frontend (Web App)](#72-frontend-web-app)
   * [7.3 Firmware ESP32 (Arduino IDE)](#73-firmware-esp32-arduino-ide)
8. [Equipe do Projeto](#8-equipe-do-projeto)
9. [Publicação no GitHub Pages](#9-publicação-no-github-pages)

---

## 1. Resumo Oficial e Sobre o Projeto

O **Projeto Ágape** tem como objetivo auxiliar famílias e cuidadores de pessoas autistas de **grau 3**, que necessitam de suporte substancial e cuidados constantes. Durante nossas pesquisas e entrevistas de campo, identificamos como principais desafios a sobrecarga física e emocional dos cuidadores, a falta de rede de apoio e as dificuldades na organização diária — fatores que impactam diretamente a saúde mental das famílias.

Como solução, desenvolvemos um ecossistema integrado composto por **um sistema dual de dispositivos embarcados (Pulseira + Hub/Pulseira do Responsável)** e **uma plataforma digital (Web App, Aplicativo Mobile e Landing Page)**:

* **Monitoramento Preventivo:** As pulseiras utilizam sensores ópticos para acompanhar os batimentos cardíacos (BPM) em tempo real e emitir alertas visuais e sonoros ao responsável antes que uma crise de ansiedade ou desregulação sensorial se agrave (já que a aceleração cardíaca antecede os sintomas externos).
* **Gestão de Rotina:** A aplicação web/mobile auxilia na organização do dia a dia, permitindo registrar comportamentos, histórico de batimentos, anotações livres, compromissos e consultar informações sobre o TEA.

---

## 2. Objetivos e Resultados Esperados

### 2.1 Objetivo Geral

Auxiliar famílias de pessoas autistas de grau 3, promovendo maior segurança, organização da rotina e qualidade de vida aos cuidadores.

### 2.2 Objetivos Específicos

* Desenvolver um sistema embarcado dual (**Pulseira do Filho + Pulseira/Hub do Responsável**) capaz de monitorar os batimentos cardíacos e emitir alertas imediatos em caso de alterações fisiológicas;
* Criar uma plataforma digital (**Web App e Mobile**) para organização da rotina, histórico de BPM, registro de comportamentos e gestão de compromissos relacionados ao cuidado diário.

### 2.3 Resultados Esperados

* Redução da preocupação e hipervigilância constante dos cuidadores por meio de alertas confiáveis em tempo real;
* Identificação antecipada de desconfortos ou crises em pessoas com comunicação verbal limitada;
* Centralização de dados clínicos e comportamentais para facilitar o acompanhamento por pais, médicos e terapeutas.

---

## 3. Metodologia, Estudo de Caso e Público-Alvo

### 3.1 Metodologia

O projeto foi estruturado a partir de **pesquisas exploratórias e entrevistas** com famílias atípicas para mapear dores reais do cotidiano. Com base nesse levantamento, definiu-se a arquitetura de hardware (ESP32, sensores biométricos, LEDs e buzzer via Bluetooth Low Energy) integrada a uma API RESTful e interfaces web/mobile acessíveis.

### 3.2 Estudo de Caso (Relato das Entrevistas)

Durante as entrevistas, acompanhamos a realidade de uma **mãe solo** de um jovem autista grau 3 totalmente dependente para atividades básicas (como alimentação e higiene). Sem rede de apoio e impossibilitada de trabalhar presencialmente, ela dependia inicialmente de auxílio governamental até conquistar uma vaga em **home-office**.

Apesar de trabalhar em casa, ela relatou intensa ansiedade durante reuniões online que exigem silêncio e foco: mesmo estando a poucos cômodos de distância, precisava interromper suas atividades constantemente para checar se o filho estava bem.

Com o **Projeto Ágape**, a pulseira monitora o filho silenciosamente e alerta a mãe imediatamente caso os batimentos se elevem — permitindo que ela mantenha a concentração no trabalho, preserve sua saúde mental e garanta a segurança do filho tanto dentro de casa quanto em passeios ou ambientes movimentados.

### 3.3 Público-Alvo e Beneficiários

* **Cuidadores e Mães/Pais Solo:** Redução da sobrecarga mental, alívio da ansiedade contínua e maior tranquilidade no dia a dia;
* **Pessoas com Autismo Grau 3:** Monitoramento não invasivo, conforto tátil e sinalização de desconforto mesmo na ausência de comunicação verbal;
* **Famílias em Home-Office:** Segurança para conciliar reuniões e trabalho remoto com o cuidado domiciliar;
* **Terapeutas e Médicos:** Acesso ao histórico de BPM, anotações e comportamentos registrados no sistema para embasar intervenções clínicas.

---

## 4. Sistema Dual de Pulseiras e Lógica de Alertas

O hardware foi projetado em duas unidades que se comunicam via **Bluetooth Low Energy (BLE)**:

1. **Pulseira 1 — Usuário / Filho (`esp32_pulseira_novo`):** Equipada com microcontrolador ESP32, sensor óptico de frequência cardíaca (**MAX30102**) e **LED Azul** de sinalização local.
2. **Pulseira 2 / Hub — Responsável (`esp32_hub_novo`):** Equipada com ESP32, **LED RGB (4 cores)** e **Buzzer sonoro**, além de atuar como ponte BLE para publicar os dados em tempo real na plataforma Web/Mobile.

### 4.1 Lógica de Alertas (4 Estágios)

O LED RGB do dispositivo do responsável opera em **4 níveis fisiológicos**:

| Cor / Estado | Condição Fisiológica | Comportamento do Hardware |
| :--- | :--- | :--- |
| 🟢 **Verde** | Batimentos estáveis (repouso normal) | LED Verde aceso no dispositivo do responsável. |
| 🟡 **Amarelo** | Variação leve / estado de atenção | LED Amarelo aceso indicando monitoramento preventivo. |
| 🟣 **Roxo** | Batimentos acelerados (alerta moderado) | LED Roxo aceso no responsável + **LED Azul acende na pulseira do filho**. |
| 🔴 **Vermelho** | Batimentos muito acelerados (alerta grave) | LED Vermelho aceso + **Buzzer sonoro apita** no dispositivo do responsável para intervenção imediata. |

### 4.2 Faixas de Referência Cardíaca (BPM)

Como a frequência cardíaca normal em repouso varia conforme a idade, o sistema calibra os alertas de acordo com as seguintes faixas:

| Faixa Etária | BPM em Repouso |
| :--- | :--- |
| **8 a 12 anos** | 70 ~ 110 BPM |
| **12 a 18 anos** | 60 ~ 100 BPM |
| **18 a 30 anos** | 60 ~ 100 BPM |

> *Referências científicas: Ostchega et al. (CDC/NCHS, 2011) e Fleming et al. (The Lancet, 2011).*

---

## 5. Estrutura do Repositório

```text
Agape/
├── backend/              # API REST (Spring Boot + Java 22)
│   ├── src/
│   └── pom.xml
├── frontend/             # Web App (React 19 + Vite 6)
│   ├── src/
│   └── package.json
├── codigos-dos-esps/     # Firmware dos microcontroladores ESP32 (Arduino)
│   ├── esp32_hub_novo/
│   └── esp32_pulseira_novo/
├── imagens/              # Logotipos e recursos visuais
├── .gitignore
└── README.md
```

---

## 6. Tecnologias Utilizadas

* **Sistemas Embarcados (IoT):** ESP32, Bluetooth Low Energy (BLE), Sensor Óptico MAX30102 (biblioteca SparkFun MAX3010x), LED RGB, LED Azul e Buzzer Piezoelétrico.
* **Backend (`backend/`):** Java 22, Spring Boot 3.5.6, Spring Data JPA, Spring Security + JWT, BCrypt, Maven e MySQL (MariaDB).
* **Frontend Web App (`frontend/`):** React 19, Vite 6, React Router 7, React Icons e Web Bluetooth API.
* **Landing Page Institucional:** HTML5 Semântico (WCAG), CSS3 Moderno (Grid/Flexbox/Design System) e JavaScript ES6+ Vanilla (com simulador interativo de 4 estágios e Web Audio API).
* **Aplicativo Mobile (`E-AGAPE-APP`):** React Native (v0.81.5), React (v19.1.0), Expo (v54.0.25), React Navigation e integração BLE.

---

## 7. Como Executar o Projeto (Guia Técnico)

### 7.1 Backend (API REST)

1. Inicie o serviço do **MySQL** (ex.: via XAMPP).
2. Crie o banco de dados:
   ```sql
   CREATE DATABASE agape_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Configure suas credenciais do banco no arquivo `backend/src/main/resources/application.properties`.
4. Execute a aplicação via Maven:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   A API estará disponível em `http://0.0.0.0:9090`.

#### Endpoints Principais

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/usuario` | Criar novo usuário |
| `GET` | `/usuario?limite=50` | Listar usuários |
| `GET` | `/usuario/{id}` | Buscar usuário por ID |
| `PUT` | `/usuario/{id}` | Atualizar dados do usuário |
| `DELETE` | `/usuario/{id}` | Remover usuário |
| `POST` | `/login` | Autenticar usuário (email + senha) → retorna token JWT |
| `POST` | `/tipo` | Criar perfil/tipo de usuário |
| `GET` | `/tipo` | Listar tipos de usuário |
| `POST` | `/pulseira` | Cadastrar pulseira |
| `GET` | `/pulseira` | Listar pulseiras |
| `GET` | `/pulseira/usuario/{id}` | Listar pulseiras vinculadas a um usuário |
| `POST` | `/dados-pulseira` | Registrar leitura de batimento cardíaco (BPM) |
| `GET` | `/dados-pulseira/usuario/{id}` | Consultar histórico de batimentos do usuário |
| `POST` | `/registro` | Criar registro comportamental |
| `GET` | `/registro` | Listar registros |
| `POST` | `/nota` | Criar anotação |
| `GET` | `/nota/usuario/{id}` | Listar notas de um usuário |
| `POST` | `/compromisso` | Criar compromisso na agenda |
| `GET` | `/compromisso/usuario/{id}?data=AAAA-MM-DD` | Consultar compromissos por data |
| `DELETE` | `/compromisso/{id}` | Remover compromisso |

### 7.2 Frontend (Web App)

1. Instale as dependências e inicie o servidor de desenvolvimento:
   ```bash
   cd frontend
   npm install
   npm run dev -- --host
   ```
2. Acesse `https://localhost:3000`. As requisições à API são roteadas automaticamente pelo proxy `/api` configurado em `vite.config.js` (evitando bloqueios de *mixed content* com a Web Bluetooth API).

#### Funcionalidades do Web App

* **Autenticação:** Login e cadastro com sessão persistente via JWT;
* **Home:** Cards informativos e educativos sobre o TEA;
* **Monitor de Batimentos:** Leitura de BPM em tempo real via Web Bluetooth (ESP32) com indicadores visuais nas 4 cores (Verde, Amarelo, Roxo e Vermelho) e **modo de simulação** integrado para testes sem hardware;
* **Histórico:** Visualização dos batimentos cardíacos armazenados no banco;
* **Notas & Agenda:** Bloco de anotações livres e agendamento de compromissos por data e horário;
* **Informações:** Conteúdo de apoio para cuidadores e familiares.

### 7.3 Firmware ESP32 (Arduino IDE)

Os códigos-fonte estão localizados em `codigos-dos-esps/` e devem ser compilados e gravados via **Arduino IDE**:

* **Pulseira (`codigos-dos-esps/esp32_pulseira_novo`):** Requer a instalação da biblioteca **SparkFun MAX3010x Pulse and Proximity Sensor Library** (`MAX30105`).
* **Hub / Receptor (`codigos-dos-esps/esp32_hub_novo`):** Utiliza apenas o pacote padrão (*core*) do ESP32 para comunicação BLE e controle dos atuadores.

---

## 8. Equipe do Projeto

| Integrante | Função / Responsabilidade |
| :--- | :--- |
| **Eduardo H.** | **Desenvolvedor Mobile e Documentação:** Desenvolvimento do aplicativo React Native (`E-AGAPE-APP`) e documentação técnica. |
| **João V.** | **IoT & Pesquisa:** Pesquisa de campo, entrevistas com cuidadores, desenvolvimento do firmware ESP32 e integração BLE. |
| **Kennay V.** | **Documentação e Refatoração:** Revisão arquitetural, refatoração de código e documentação geral do TCC. |
| **Pedro H.** | **Desenvolvedor FullStack e Banco de Dados:** Desenvolvimento da API Spring Boot, frontend web/landing page e modelagem do banco MySQL. |

---

## 9. Publicação no GitHub Pages

* **Landing Page:** [https://agape-tcc.github.io/TCC_Agape/](https://agape-tcc.github.io/TCC_Agape/)