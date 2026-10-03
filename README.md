# PROJETO ÁGAPE — AUTISMO GRAU 3, SISTEMA DUAL DE PULSEIRAS E ROTINA

---

## 1. Nome do Projeto
**Projeto Ágape**

---

## 2. Resumo Oficial
O projeto **ÁGAPE** tem como objetivo auxiliar famílias de pessoas autistas de grau 3, que necessitam de cuidados constantes. Durante as pesquisas e entrevistas, identificamos como principais problemas a sobrecarga dos cuidadores, a falta de apoio e as dificuldades de organização, fatores que podem prejudicar sua saúde mental.

Como solução, desenvolvemos a proposta de um **aplicativo/site e duas pulseiras inteligentes**. As pulseiras utilizam sensores para monitorar os batimentos cardíacos e emitir alertas ao responsável quando forem identificadas alterações. O aplicativo/site auxilia na organização da rotina, permitindo registrar comportamentos, informações e compromissos relacionados ao cuidado.

Assim, o projeto busca proporcionar mais segurança, organização e tranquilidade aos cuidadores.

---

## 3. Objetivos do Projeto

### 3.1 Objetivo Geral
O objetivo geral do projeto **ÁGAPE** é auxiliar famílias de pessoas autistas de grau 3, contribuindo para a segurança, organização e qualidade de vida dos cuidadores.

### 3.2 Objetivos Específicos
* Desenvolver um sistema de **duas pulseiras inteligentes** para monitorar os batimentos cardíacos e emitir alertas ao responsável;
* Criar um **aplicativo/site** que auxilie na organização da rotina, permitindo registrar comportamentos, informações e compromissos relacionados ao cuidado diário.

---

## 4. Resultados Esperados
Espera-se que o projeto **ÁGAPE** contribua para a segurança e organização das famílias, reduzindo a preocupação constante dos cuidadores:
* As pulseiras poderão auxiliar no monitoramento dos batimentos cardíacos e na emissão de alertas em situações de alteração;
* O aplicativo/site poderá facilitar a organização da rotina, permitindo registrar comportamentos e informações importantes;
* Dessa forma, o projeto busca melhorar a qualidade de vida dos cuidadores e auxiliar no cuidado diário da pessoa autista.

---

## 5. Metodologia
O projeto foi desenvolvido inicialmente por meio de **pesquisas e entrevistas** para identificar as principais dificuldades enfrentadas pelas famílias. A partir dos problemas encontrados, foi definida a criação de um sistema composto por **duas pulseiras inteligentes e um aplicativo/site**:
* As pulseiras utilizam **sistemas embarcados**, **LED RGB**, **LED vermelho/azul**, **sensor de batimentos cardíacos** e **buzzer**, permitindo o monitoramento e a emissão de alertas;
* O aplicativo/site foi planejado para auxiliar na organização da rotina, possibilitando o registro de comportamentos, informações e compromissos.

---

## 6. O Sistema de Duas Pulseiras

Utilizando de dispositivos de sistemas embarcados, decidimos fazer não uma, mas **duas pulseiras inteligentes**:
1. **Pulseira 1 (Filho Autista Grau 3):** Possui um **LED Azul** e um **sensor de batimentos cardíacos**, sendo utilizada pelo filho autista;
2. **Pulseira 2 (Mãe / Pai / Responsável):** Possui um **LED RGB (4 cores)** e um **Buzzer sonoro**, usada pelo cuidador.

### 6.1 Funcionamento do Protótipo (Lógica de Alertas)
O LED RGB da pulseira da mãe opera com **4 cores**:
* 🟢 **Verde:** Os batimentos cardíacos do filho estão estáveis;
* 🟡 **Amarela:** Variação leve / estado de atenção;
* 🟣 **Roxo:** Os batimentos cardíacos do filho estão acelerados. A partir da cor roxa, o **LED Azul do filho irá acender**;
* 🔴 **Vermelha:** Os batimentos cardíacos do filho estão muito acelerados. O **Buzzer da mãe irá apitar**, indicando que os batimentos cardíacos do filho estão acelerados e é necessário ficar atento e intervir imediatamente.

---

## 7. Em Que Esse Dispositivo Ajudaria? (Estudo de Caso das Entrevistas)

Em uma de nossas entrevistas com uma mãe que possui um filho autista grau 3 totalmente dependente até mesmo para tarefas básicas como ir ao banheiro ou segurar uma colher para comer, ela havia comentado que a constante presença dela era necessária em cuidar do filho. Ela é mãe solo, ou seja, cuida sozinha do filho sem um pai, nisso dificulta ainda mais o cuidado e em suprir todas as necessidades que cuidar de um filho autista requer.

Por esse fato, a renda dessa família acaba não sendo o suficiente para o sustento de ambos, assim ela recebe auxílio governamental para sobreviverem, pois conseguir trabalhar presencialmente é quase impossível para essas famílias que na maioria das vezes não têm com quem deixar o filho, assim ela fica em casa.

Porém, felizmente ela conseguiu um emprego em **home-office**, onde trabalha em casa apenas com o computador, aumentando a renda da família. Entretanto, mesmo o emprego sendo favorável para tal condição, há momentos em que ela não pode estar o tempo todo com o filho, pois tem de fazer reuniões que precisam de silêncio e concentração. Assim, ela relata que mesmo estando a poucos cômodos da casa de distância com o filho não a deixa ter grande concentração e foco em seu trabalho, pois ela precisa o tempo todo checar se o filho está bem.

E nisso entraria a utilização da pulseira: com o auxílio da pulseira para alertá-la quando o filho estiver desconfortável, ela conseguiria concentrar-se mais no serviço, em que também melhoraria a saúde mental dela, diminuindo a ansiedade e preocupação constante.

Há também outras situações em que essa pulseira seria útil, por exemplo em monitorar se os batimentos cardíacos do filho estão estáveis enquanto andam na rua ou participam de ambientes povoados.

---

## 8. Público-Alvo & Beneficiários
* **Cuidadores e Mães Solo:** Redução drástica da sobrecarga, melhora da saúde mental e alívio da ansiedade contínua;
* **Pessoas com Autismo Grau 3:** Proteção silenciosa, conforto tátil e sinalização de desconforto mesmo sem comunicação verbal;
* **Famílias em Home-Office:** Concentração e foco profissional durante reuniões, sabendo que a pulseira alertará caso ocorra qualquer alteração no outro cômodo;
* **Terapeutas e Médicos:** Acesso aos registros de comportamentos e compromissos anotados no aplicativo/site para guiar intervenções clínicas.

---

## 9. Tecnologias Utilizadas

### Landing Page Web
* **HTML5 Semântico:** Estrutura semântica e acessível (WCAG);
* **CSS3 Moderno:** Design System com variáveis CSS, Grid, Flexbox, micro-animações, estados de LED e responsividade total;
* **JavaScript ES6+ (Vanilla):** Simulador dual de pulseiras com 4 estágios fisiológicos, bipe de buzzer via Web Audio API e navegação acessível.

### Aplicativo Mobile (`E-AGAPE-APP`)
* **React Native (v0.81.5) & React (v19.1.0)**
* **Expo Framework (v54.0.25)**
* **BLE / Bluetooth:** Integração com os sistemas embarcados;
* **React Navigation:** Módulos de Rotina, Notas, Histórico, Informações e Alertas.

### Backend & API REST (`E-API-AGAPE`)
* **Java 22 & Spring Boot 3**
* **MySQL:** Armazenamento seguro de registros fisiológicos, rotinas e anotações.

### Sistemas Embarcados
* **Microcontrolador com Bluetooth Low Energy (BLE)**
* **Sensor de Frequência Cardíaca (Pulso Óptico)**
* **LED Azul (Pulseira do Filho)**
* **LED RGB 4 Cores (Pulseira da Mãe)**
* **Buzzer Sonoro Piezoelétrico (Pulseira da Mãe)**

---

## 10. Equipe do Projeto

| Integrante | Função / Responsabilidade |
| :--- | :--- |
| **Eduardo H.** | **Desenvolvedor Mobile e Documentação:** Responsável pela documentação e desenvolvimento do app React Native. |
| **João V.** | **IoT & Pesquisa:** Pesquisa de campo, entrevistas com cuidadores e integração BLE com sistemas embarcados. |
| **Kennay V.** | **Documentação e Refatoração dos códigos:** Responsável pela documentação e refatoração dos códigos do projeto. |
| **Pedro H.** | **Desenvolvedor FullStack e Banco de Dados:** Responsável pelo desenvolvimento da API Spring Boot, frontend da landing page e modelagem do banco de dados MySQL. |

---

## 11. Publicação no GitHub Pages

```text
Landing Page:
https://USUARIO.github.io/
```