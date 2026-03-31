# 📝 Mini PRD - StudyFlow

# 📝 StudyFlow - Gestão Inteligente de Estudos

O **StudyFlow** é uma aplicação web desenvolvida para ajudar estudantes de qualquer área a vencerem a procrastinação e organizarem sua jornada de aprendizado. Através de um sistema de metas diárias e timers individuais, a ferramenta transforma o estudo abstrato em progresso visível.

## 1. Visão Geral do Produto
O **StudyFlow** é uma aplicação de gerenciamento de estudos focada em estudantes que precisam organizar seus resumos e cronogramas de forma simples e eficiente. <br>
A "ilusão de competência", onde o estudante consome conteúdo por horas mas não sabe o quanto realmente progrediu ou se cumpriu sua carga horária planejada.


## 2. O Problema
Estudantes de ADS lidam com um volume massivo de informações. A falta de uma ferramenta centralizada para registrar o progresso e armazenar resumos técnicos dificulta a retenção do aprendizado a longo prazo.

## 3. Público-Alvo
* Estudantes em qualquer nível escolar, graduandos, pós-graduandos, concurseiros e entusiastas de tecnologia que buscam centralizar seus resumos e controlar o tempo líquido de estudo.

## 4. Requisitos Funcionais (O que o app faz)
* **RF01 - Cadastro/Login:** O usuário deve criar uma conta segura para acessar seus dados.
* **RF02 - Gerenciamento de Resumos:** O usuário pode criar, visualizar e listar seus resumos de estudo.
* **RF03 - Filtro de Conteúdo:** Busca rápida por temas específicos.

## 5. Decisões Técnicas & Arquitetura
* **Frontend:** React + TypeScript (pela tipagem forte) + Tailwind CSS (agilidade no estilo).
* **Backend:** JSON Server (para prototipagem rápida de uma API REST).
* **Deploy:** Render (Backend) e Vercel (Frontend).
* **Persistência:** Arquivo `db.json` simulando um banco de dados NoSQL.

## 6. O que faria diferente (Próximos Passos)
* Substituir o JSON Server por um banco de dados real (PostgreSQL ou MongoDB) para evitar a perda de dados no deploy efêmero do Render.
* Implementar autenticação via JWT (JSON Web Token) para maior segurança.
* Adicionar funcionalidade de "Pomodoro" integrada aos cards de estudo.

## 🚀 Tecnologias Utilizadas

* **Frontend:** [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Ícones:** [Lucide-React](https://lucide.dev/)
* **Comunicação:** [Axios](https://axios-http.com/)


---
**E-mail para conferência:** [evely.sdev@gmail.com] 
