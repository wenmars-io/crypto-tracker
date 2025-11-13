# Claude Code GitHub Integration

Ce projet utilise **Claude Code** (connecté à votre profil GitHub) pour automatiser les reviews de Pull Requests.

## Configuration

### 1. S'assurer que Claude Code est connecté à GitHub

```bash
claude code status
```

Si Claude Code n'est pas connecté :
```bash
claude code login
```

### 2. Configurer les permissions GitHub

Dans votre repository GitHub :

1. Allez sur **Settings** → **Actions** → **General**
2. Sous "Actions permissions", sélectionnez **"Allow all actions and reusable workflows"**
3. Cliquez sur **Save**

### 3. Activer le workflow

Les workflows dans `.github/workflows/` s'exécutent automatiquement :

- `.github/workflows/claude-code-review.yml` - Review des PRs avec Claude

## Comment ça fonctionne

Quand une PR est ouverte ou mise à jour :

1. ✅ GitHub Actions clone le code
2. ✅ Récupère les changements et la diff
3. ✅ Crée un commentaire sur la PR avec la demande de review
4. ✅ **Claude Code reçoit la notification** (via votre connexion GitHub)
5. ✅ Vous pouvez reviewer dans Claude Code ou laisser Claude donner des recommandations

## Utilisation

### Option 1: Review manuelle dans Claude Code

1. Quand une PR est créée, vous recevez une notification
2. Ouvrez Claude Code
3. Claude Code affiche la demande de review
4. Étudiez les changements et fournissez des recommandations
5. Vos commentaires s'ajoutent automatiquement à la PR

### Option 2: Utiliser l'API Anthropic (optionnel)

Si vous voulez des reviews entièrement automatisées, ajoutez votre `ANTHROPIC_API_KEY` :

1. Settings → Secrets and variables → Actions
2. New repository secret: `ANTHROPIC_API_KEY`
3. Valeur: Votre clé API d'Anthropic

Modifiez `.github/workflows/claude-code-review.yml` pour utiliser l'API directement.

## Structure des fichiers

```
.github/
├── workflows/
│   └── claude-code-review.yml      # Workflow principal
├── pull_request_template.md         # Template pour les PRs
└── CLAUDE_CODE_SETUP.md            # Ce fichier
```

## Personnalisation

### Modifier les règles de trigger

Éditez `.github/workflows/claude-code-review.yml` :

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
    # Ajouter des filtres de chemins
    paths:
      - 'lib/**'
      - 'application/**'
```

### Ignorer certains fichiers

```yaml
    paths-ignore:
      - '*.md'
      - '.gitignore'
      - 'docs/**'
```

## Avantages de cette approche

✨ **Pas de coûts API** - Claude Code est inclus dans votre abonnement
⚡ **Intégration native** - Fonctionne directement avec GitHub
👤 **Reviews personnalisées** - Vous êtes impliqué dans le processus
🔒 **Sécurisé** - Pas besoin de stocker de clés API GitHub

## Dépannage

### Le workflow ne s'exécute pas

1. Vérifiez que Claude Code est connecté: `claude code status`
2. Vérifiez l'onglet **Actions** sur GitHub pour les erreurs
3. Assurez-vous que le workflow YAML est syntaxiquement correct

### Les commentaires n'apparaissent pas

1. Vérifiez que le workflow s'est exécuté avec succès
2. Vérifiez les permissions du token GitHub
3. Assurez-vous que Claude Code a reçu la notification

## Ressources

- [Documentation Claude Code](https://docs.claude.com/en/docs/claude-code/claude_code_docs_map.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Notifications](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github)
