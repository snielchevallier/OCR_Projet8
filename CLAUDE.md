@AGENTS.md

# Accessibilité (WCAG 2.1 niveau AA)

Ces règles s'appliquent à tout HTML/JSX généré.

## Sémantique
- Utiliser les éléments HTML natifs sémantiques (`button`, `a`, `nav`, `main`, `header`, `footer`, `section`, `article`, `aside`) plutôt que des `div` avec handlers
- Un seul `<h1>` par page ; hiérarchie des titres strictement croissante (pas de saut de h2 à h4)
- Les listes de navigation utilisent `<ul>` / `<li>`

## Images et médias
- Attribut `alt` obligatoire sur toutes les `<img>` — descriptif pour les images informatives, `alt=""` pour les images décoratives
- Les SVG décoratifs ont `aria-hidden="true"`

## Formulaires
- Chaque `<input>`, `<select>`, `<textarea>` a un `<label>` associé via `htmlFor` (ou `aria-label` si le label visible est impossible)
- Les messages d'erreur sont liés au champ avec `aria-describedby`

## Navigation clavier
- Tous les éléments interactifs sont atteignables au clavier (`tabIndex` uniquement si nécessaire)
- Pas de `outline: none` sans alternative visible de focus
- Les modales et menus déroulants trapent le focus (`focus trap`) et se ferment avec Escape

## ARIA
- Ne pas utiliser ARIA si un élément HTML natif suffit
- Utiliser `aria-expanded`, `aria-controls`, `aria-current` sur les composants de navigation et d'accordéon
- Les icônes-boutons sans texte visible ont `aria-label`

## Couleurs et contraste
- Ne pas transmettre l'information par la couleur seule (ajouter icône ou texte)
- Respecter un ratio de contraste ≥ 4.5:1 pour le texte normal et ≥ 3:1 pour le grand texte

## Tailwind
- Préférer les variantes `focus-visible:` à `focus:` pour les styles de focus
- Utiliser `sr-only` pour le texte réservé aux lecteurs d'écran


## Intégration
- Toujours prévoir les versions mobile, tablette et desktop.
- Utiliser au maximum les couleurs définies dans globals.css

# Documentation JSDoc

Ajouter un commentaire JSDoc uniquement si au moins une de ces conditions est vraie :
- Le comportement n'est **pas évident** depuis le nom seul (effet de bord, convention, cas limite)
- La fonction a des **paramètres non triviaux** (format attendu, valeurs acceptées, optionnels)
- La fonction peut **lever une erreur** ou retourner `null`/`undefined` dans certains cas

Ne jamais documenter :
- Ce que fait le code (les noms suffisent)
- Les composants de page simples sans logique propre
- Les props dont le type TypeScript est déjà explicite

Format minimal : `@param`, `@returns`, `@throws` seulement si utiles. Pas de `@description` verbeux.