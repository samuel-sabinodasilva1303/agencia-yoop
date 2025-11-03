# Yoop - Landing Page

Landing page para a agência digital Yoop, desenvolvida com Next.js 14+ e CSS Modules.

## Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador

### Configuração de Email

Para habilitar o envio de emails no formulário de contato, você precisa configurar um serviço de email no arquivo `app/api/contact/route.ts`.

Opções recomendadas:
- **Nodemailer** com SMTP (Gmail, Outlook, etc.)
- **SendGrid**
- **AWS SES**
- **Resend**

Exemplo com Nodemailer:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

Depois atualize o arquivo `app/api/contact/route.ts` com suas credenciais.

