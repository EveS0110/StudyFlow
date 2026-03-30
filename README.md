# 📝 StudyFlow - Gestão Inteligente de Estudos

O **StudyFlow** é uma aplicação web desenvolvida para ajudar estudantes de qualquer área a vencerem a procrastinação e organizarem sua jornada de aprendizado. Através de um sistema de metas diárias e timers individuais, a ferramenta transforma o estudo abstrato em progresso visível.

---

## 📋 Mini PRD (Product Requirements Document)

### 1. O Problema
* **Dificuldade Específica:** A "ilusão de competência", onde o estudante consome conteúdo por horas mas não sabe o quanto realmente progrediu ou se cumpriu sua carga horária planejada.
* **Público-Alvo:** Estudantes de graduação, concurseiros e entusiastas de tecnologia que buscam centralizar seus resumos e controlar o tempo líquido de estudo.

### 2. Soluções Principais
* **Timer de Estudo Individual:** Cronômetro integrado a cada matéria para medir a dedicação real.
* **Cálculo de Meta Diária:** Barra de progresso que reage em tempo real e sinaliza visualmente (cor verde) quando o objetivo do dia é atingido.
* **Gestão de Conteúdo:** Espaço para resumos técnicos e links de referência externa.

### 3. Decisões Técnicas
* **API REST:** Consumo de dados via JSON-Server/Backend próprio utilizando operações **GET** (leitura), **POST** (criação), **PATCH** (atualização parcial de progresso e conteúdo) e **DELETE** (remoção).
* **Persistência:** Este projeto utiliza o **json-server** para simular uma API REST de forma rápida e eficiente.

---

## 🚀 Tecnologias Utilizadas

* **Frontend:** [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Ícones:** [Lucide-React](https://lucide.dev/)
* **Comunicação:** [Axios](https://axios-http.com/)

---

## 🛠️ Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone (https://github.com/EveS0110/StudyFlow.git)

2. **Instale as dependências:**
  npm install

3. **Inicie o projeto:**
  npm run dev


Desenvolvido por **Evely Sena** 

[Linkedin](https://www.linkedin.com/in/evelysdev/)

**Demontração do StudyFlow**
![Tela inicial do StudyFlow](https://drive.google.com/uc?export=view&id=1QvZTYeeB5Lv_rOj59A45BIn6xVgOKLSF)
![Interface do StudyFlow](https://drive.google.com/uc?export=view&id=18A9BZEasU1A-b8GJ2FcwELZclF6m30M1)

**Acesse o projeto através do link do deploy**
[deploy](https://study-flow-pearl.vercel.app/)<br>[deploy backend](https://studyflow-ieq7.onrender.com/)



