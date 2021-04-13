### This file contains text that is needed everywere or is too generic
### to need another catalog


## General terms

app-name = conduit
app-slogan = Um lugar para compartilhar seu conhecimento.
company-name = Thinkster
company-website = https://thinkster.io

## Generic content

# Generic sign-in text used on the title of the login page and as label
# for the submit button
generic-sign-in = Entrar
generic-sign-up = Cadastrar

## Header

# Text for the links to the home page
home-link = Home
# Text for the link to create a new article
new-article-action = Novo Artigo
# Link to settings page
settings = Configurações

## Footer

footer-text = Um projeto de aprendizado interativo por { $linkToCompany }. Código e design disponibilizados com a licença MIT.
    .company-name = { company-name }
    .company-website = { company-website }

## Home

your-feed = Seu Feed
global-feed = Feed Global
popular-tags = Tags Populares

## Login and register pages

need-an-account = Precisa de uma conta?
have-an-account = Já tem conta?
username-input =
    .placeholder = Nome de usuário
email-input =
    .placeholder = Email
password-input =
    .placeholder = Senha

## Article stuff

# The two parameters will be replaced with links and each link
# will use the .sign-*-label as its text
sign-in-up-to-add-comments = { $signInLink } ou { $signUpLink } para adicionar comentários neste artigo.
    .sign-in-label = Entre
    .sign-up-label = cadastre-se
long-date = { DATETIME($date, month: "long", year: "numeric", day: "numeric") }

## Backend errors

error__email-or-password__is-invalid = Email or senha inválidos
