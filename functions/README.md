# Cloud Functions - Setup Guide

## 🚀 Configuração Inicial

### 1. Criar Service Account no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Selecione seu projeto: `cb-vempreender`
3. Vá em **IAM & Admin → Service Accounts**
4. Clique em **Create Service Account**
5. Nome: `vempreender-functions`
6. Atribua as seguintes permissões:
   - **Calendar**: Editor de Calendário do Google
   - **Sheets**: Editor do Google Sheets
   - **Speech**: Usuário da API Cloud Speech-to-Text
7. Clique em **Create Key** → JSON
8. Salve o arquivo como `serviceAccountKey.json` na pasta `functions/`

### 2. Habilitar APIs

No Google Cloud Console, habilite as seguintes APIs:
- ✅ Google Calendar API
- ✅ Google Sheets API  
- ✅ Cloud Speech-to-Text API

### 3. Instalar Dependências

```bash
cd functions
npm install
```

### 4. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

Edite `.env` e configure:
```env
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
DEFAULT_CALENDAR_ID=primary
SPEECH_LANGUAGE_CODE=pt-BR
```

### 5. Compartilhar Calendários e Planilhas

Para usar o Calendar e Sheets, você precisa compartilhar com o email da Service Account:

1. Abra o email da Service Account (algo como `vempreender-functions@cb-vempreender.iam.gserviceaccount.com`)
2. **Google Calendar**: Compartilhe o calendário com permissão de "Fazer mudanças em eventos"
3. **Google Sheets**: Compartilhe planilhas com permissão de "Editor"

---

## 📦 Deploy

### Build Local
```bash
npm run build
```

### Deploy para Firebase
```bash
cd ..
firebase deploy --only functions
```

### Testar Localmente (Emulador)
```bash
cd functions
npm run serve
```

---

## 🔗 Endpoints Disponíveis

### Calendar Manager
- `POST /calendarManager/create` - Criar evento
- `GET /calendarManager/available?date=YYYY-MM-DD` - Horários disponíveis
- `PATCH /calendarManager/update/:eventId` - Atualizar evento
- `DELETE /calendarManager/cancel/:eventId` - Cancelar evento

### Sheets Manager
- `POST /sheetsManager/create` - Criar planilha
- `GET /sheetsManager/read?spreadsheetId=X&range=A1:C10` - Ler dados
- `POST /sheetsManager/append` - Adicionar linha
- `PATCH /sheetsManager/update` - Atualizar células
- `POST /sheetsManager/calculate` - Calcular valores
- `POST /sheetsManager/saveLead` - Salvar lead

### Audio Transcription
- `POST /audioTranscription/transcribe` - Transcrever áudio
- `GET /audioTranscription/status` - Health check

---

## 🧪 Exemplos de Uso

### Criar Evento no Calendar
```bash
curl -X POST https://us-central1-cb-vempreender.cloudfunctions.net/calendarManager/create \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user123",
    "title": "Reunião com Cliente",
    "description": "Apresentação do produto",
    "start": "2026-01-15T14:00:00-03:00",
    "end": "2026-01-15T15:00:00-03:00",
    "attendees": [{"email": "cliente@example.com"}]
  }'
```

### Buscar Tabela de Preços no Sheets
```bash
curl "https://us-central1-cb-vempreender.cloudfunctions.net/sheetsManager/read?spreadsheetId=YOUR_SHEET_ID&range=Precos!A2:C50"
```

### Calcular Pedido
```bash
curl -X POST https://us-central1-cb-vempreender.cloudfunctions.net/sheetsManager/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "spreadsheetId": "YOUR_SHEET_ID",
    "pricesRange": "Precos!A2:B100",
    "items": [
      {"product": "Produto A", "quantity": 3},
      {"product": "Produto B", "quantity": 1}
    ]
  }'
```

### Transcrever Áudio
```bash
curl -X POST https://us-central1-cb-vempreender.cloudfunctions.net/audioTranscription/transcribe \
  -F "audio=@audio.mp3" \
  -F "userId=user123"
```

---

## 🔐 Segurança

⚠️ **IMPORTANTE**: Nunca commite o arquivo `serviceAccountKey.json` no Git!

O `.gitignore` já está configurado para proteger:
- `serviceAccountKey.json`
- `.env`
- Arquivos compilados (`lib/`)

---

## 📝 Logs e Monitoramento

Ver logs em tempo real:
```bash
firebase functions:log
```

Ou acesse: [Firebase Console - Functions](https://console.firebase.google.com/project/cb-vempreender/functions)
