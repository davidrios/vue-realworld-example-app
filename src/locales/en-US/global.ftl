### This file contains text that is needed everywere or is too generic
### to need another catalog

## General terms

app-name = conduit
app-slogan = A place to share your knowledge.

company-name = Thinkster
company-website = https://thinkster.io


## Generic content

# Generic sign-in text used on the title of the login page and as label
# for the submit button
generic-sign-in = Sign-in

generic-sign-up = Sign up


## Header

# Text for the links to the home page
home-link = Home

# Text for the link to create a new article
new-article-action = New Article

# Link to settings page
settings = Settings


## Footer

footer-text =
    An interactive learning project from {$linkToCompany}. Code & design licensed under MIT.
    .company-name = {company-name}
    .company-website = {company-website}


## Home

your-feed = Your Feed
global-feed = Global Feed
popular-tags = Popular Tags


## Login and register pages

need-an-account = Need an account?

have-an-account = Have an account?

username-input =
    .placeholder = Username

email-input =
    .placeholder = Email

password-input =
    .placeholder = Password


## Article stuff

# The two parameters will be replaced with links and each link
# will use the .sign-*-label as its text
sign-in-up-to-add-comments =
    {$signInLink} or {$signUpLink} to add comments on this article.
    .sign-in-label = Sign in
    .sign-up-label = sign up

long-date = { DATETIME($date, month: "long", year: "numeric", day: "numeric") }


## Backend errors

error__email-or-password__is-invalid = Email or password invalid
