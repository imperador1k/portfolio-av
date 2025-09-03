# CV Download Setup

## Como adicionar o seu CV em PDF

Para ativar o download do CV, siga estes passos:

### 1. Preparar o CV
- Crie um arquivo PDF com o seu CV
- Nomeie o arquivo como `Miguel_Santos_CV.pdf`
- Coloque o arquivo na pasta `public/`

### 2. Atualizar o componente EnhancedAbout.tsx

No arquivo `src/components/EnhancedAbout.tsx`, encontre o botão de download (linha ~200) e atualize:

```tsx
<button 
  className="bg-gradient-to-r from-nebulaPink to-cosmicBlue text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
  onClick={() => {
    const link = document.createElement('a');
    link.href = '/Miguel_Santos_CV.pdf';
    link.download = 'Miguel_Santos_CV.pdf';
    link.click();
  }}
>
  <Download className="w-5 h-5" />
  Download CV (PDF)
</button>
```

### 3. Estrutura de pastas
```
public/
├── Miguel_Santos_CV.pdf  ← Seu CV aqui
└── signature-logo.svg
```

### 4. Teste
- Execute `npm run dev`
- Vá para a seção "About Me"
- Clique no botão "Download CV (PDF)"
- O arquivo deve ser baixado automaticamente

## Dicas para o CV

### Conteúdo recomendado:
- **Informações pessoais**: Nome, email, telefone, localização
- **Resumo profissional**: 2-3 linhas sobre você
- **Experiência**: Fiverr, projetos pessoais, trabalhos acadêmicos
- **Projetos**: Lista dos 6 projetos mencionados
- **Skills**: React, TypeScript, Node.js, etc.
- **Educação**: Engenharia Informática
- **Idiomas**: Português (nativo), Inglês (fluente), Francês (aprendendo)
- **Hobbies**: Rock climbing, gaming, fitness, idiomas

### Design:
- Use cores consistentes com o portfólio (azul/rosa)
- Mantenha layout limpo e profissional
- Máximo 2 páginas
- Inclua links para GitHub, LinkedIn, portfólio

## Alternativa: Link externo

Se preferir hospedar o CV em outro lugar:

```tsx
<a 
  href="https://drive.google.com/file/d/SEU_LINK_AQUI/view"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-gradient-to-r from-nebulaPink to-cosmicBlue text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 mx-auto"
>
  <Download className="w-5 h-5" />
  Download CV (PDF)
</a>
```
