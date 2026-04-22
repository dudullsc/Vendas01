# Concilia Landing Page

Landing page estática da Concilia com calculadora de prejuízo, formulário de contato com envio para WhatsApp e build de produção.

## Visão geral

Este projeto foi preparado para:

- Corrigir carregamento de imagens por caminho relativo
- Melhorar segurança no front-end e no servidor Apache
- Enviar dados do formulário para WhatsApp com mensagem estruturada
- Gerar build minificado para publicação
- Facilitar deploy em hospedagem Apache

## Estrutura do projeto

- index.html: Página principal com layout, calculadora, formulário e scripts
- imagens/: Assets visuais usados na página
- scripts/build.mjs: Script de build de produção
- package.json: Dependências e comando de build
- package-lock.json: Lock de dependências npm
- .htaccess: Regras Apache para segurança, cache, compressão e HTTPS
- .gitignore: Exclusões de arquivos/pastas desnecessários no Git
- dist/: Saída de build pronta para deploy

## Requisitos

- Node.js 18+ (recomendado 20+)
- npm 9+
- Hospedagem Apache para usar .htaccess

## Instalação

No diretório do projeto, execute:

npm install

## Como rodar localmente

Como o projeto é HTML estático, você pode:

- Abrir o index.html no navegador
- Ou usar uma extensão de servidor local no VS Code

## Como fazer o build

1. No diretório do projeto, execute:

npm run build

2. O resultado será gerado em:

- dist/index.html (minificado)
- dist/imagens/ (copiadas automaticamente)
- dist/.htaccess (copiado automaticamente)

## O que o build faz

O script scripts/build.mjs executa os passos abaixo:

1. Remove a pasta dist anterior
2. Cria nova pasta dist
3. Minifica o index.html (HTML, CSS inline e JS inline)
4. Copia a pasta imagens para dist/imagens
5. Copia .htaccess para dist/.htaccess

## Publicação em hospedagem Apache

### Opção 1: Painel/gerenciador de arquivos

1. Rode npm run build
2. Entre no painel da sua hospedagem
3. Acesse a pasta pública do domínio (geralmente public_html)
4. Envie todo o conteúdo da pasta dist
5. Confirme se o arquivo .htaccess ficou na raiz pública

### Opção 2: FTP

1. Rode npm run build
2. Conecte no FTP da sua hospedagem
3. Acesse a pasta pública do site
4. Suba os arquivos de dist (incluindo .htaccess e imagens)

## Segurança aplicada

### No index.html (meta headers)

- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy com recursos bloqueados
- Content-Security-Policy ajustada para o projeto

### No .htaccess (servidor Apache)

- Forçar HTTPS
- Bloquear listagem de diretórios
- Headers de segurança adicionais
- Compressão com mod_deflate
- Política de cache para HTML e assets

## Formulário e WhatsApp

O formulário da seção de contato:

- Valida os campos obrigatórios
- Formata telefone
- Usa honeypot anti-bot
- Monta mensagem com dados do lead e resultados da calculadora
- Abre WhatsApp via URL wa.me

### Configuração importante

No index.html, ajuste o número de WhatsApp para o número real de atendimento.

Procure por:

const whatsappNumber = '5547999999999';

Substitua pelos dígitos no formato:

55 + DDD + número

Exemplo:

5547991234567

## Git e versionamento

O arquivo .gitignore está configurado para não versionar:

- node_modules/
- dist/
- Logs de pacote
- Arquivos de sistema/IDE

## Comandos úteis

Instalar dependências:

npm install

Gerar build:

npm run build

## Solução de problemas

Imagens não aparecem:

- Verifique se a pasta imagens existe na raiz do projeto
- Verifique se os nomes dos arquivos batem exatamente com os do HTML
- Em produção, confirme se dist/imagens foi enviado

WhatsApp não abre:

- Confirme que o número no index.html está correto
- Teste a URL manualmente no navegador
- Verifique bloqueio de pop-up no navegador

Regras do .htaccess não funcionam:

- Confirme que o servidor está em Apache
- Verifique se o .htaccess foi enviado para a raiz pública
- Confirme se módulos do Apache estão habilitados na hospedagem

## Observação

Minificação e hardening aumentam proteção, mas não substituem segurança de backend. Como o projeto é estático, não armazene segredos no front-end.
