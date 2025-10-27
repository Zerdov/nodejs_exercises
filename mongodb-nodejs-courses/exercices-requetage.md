# Exercices sur les requêtes simples (filtrage et opérateurs)

Exercice 1 : Trouver les annonces à bas prix
- Question : Quelles annonces ont un price strictement inférieur à 80 (USD) ?

```bash
db.listingsAndReviews.find(
  { price: { $lt: NumberDecimal("80.00") } },
  { name: 1, price: 1, _id: 0 }
)
```

Exercice 2 : Trouver les annonces spacieuses
- Question : Quelles annonces peuvent accueillir (accommodates) 6 personnes ou plus ?

```bash
db.listingsAndReviews.find(
  { accommodates: { $gte: 6 } },
  { name: 1, accommodates: 1, _id: 0 }
)
```

Exercice 3 : Annonces avec plusieurs chambres
- Question : Quelles annonces ont au moins 2 chambres (bedrooms >= 2) et au moins 2 lits (beds >= 2) ?

```bash
db.listingsAndReviews.find(
  { 
    bedrooms: { $gte: 2 },
    beds: { $gte: 2 }
  },
  { name: 1, bedrooms: 1, beds: 1, _id: 0 }
)
```

Exercice 4 : Filtrer par pays ou par ville
- Question : Quelles annonces sont situées au Brésil (address.country) ?

```bash
db.listingsAndReviews.find(
  { "address.country": "Brazil" },
  { name: 1, "address.country": 1, _id: 0 }
)
```

Exercice 5 : Rechercher des annonces d’un certain type
- Question : Quels logements sont de type “Apartment” ou “Condominium” ?

```bash
db.listingsAndReviews.find(
  { property_type: { $in: ["Apartment", "Condominium"] } },
  { name: 1, property_type: 1, _id: 0 }
)
```

Exercice 6 : Trouver les annonces sans frais de ménage
- Question : Quelles annonces n’ont pas de champ cleaning_fee ou ont cleaning_fee à 0 ?

```bash
db.listingsAndReviews.find(
  { 
    $or: [
      { cleaning_fee: { $exists: false } },
      { cleaning_fee: NumberDecimal("0.00") }
    ]
  },
  { name: 1, cleaning_fee: 1, _id: 0 }
)
```

# Exercices sur les opérateurs avancés (regex, in, nin, etc.)

Exercice 7 : Rechercher par mot-clé
- Question : Quelles annonces contiennent le mot “cozy” (ou “spacious”) dans leur summary ?

```bash
db.listingsAndReviews.find(
  { 
    $or: [
      { summary: { $regex: /cozy/i } },
      { summary: { $regex: /spacious/i } }
    ]
  },
  { name: 1, summary: 1, _id: 0 }
)
```

Exercice 8 : Filtrer par plusieurs pays
- Question : Afficher les annonces situées soit en France, soit en Espagne.

```bash
db.listingsAndReviews.find(
  { "address.country": { $in: ["France", "Spain"] } },
  { name: 1, "address.country": 1, _id: 0 }
)
```

Exercice 9 : Annonces sans Wifi
- Question : Quelles annonces n’ont pas “Wifi” dans leurs amenities ?

```bash
db.listingsAndReviews.find(
  { amenities: { $nin: ["Wifi"] } },
  { name: 1, amenities: 1, _id: 0 }
)
```

# Exercices sur les aggrégations (Aggregation Pipeline)

Exercice 10 : Comptage des annonces par pays
- Question : Combien d’annonces par address.country ?

```bash
db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: "$address.country",
      totalListings: { $sum: 1 }
    }
  }
])
```

Exercice 11 : Top 5 des annonces les mieux notées
- Question : Quelles sont les 5 annonces avec le plus haut score de review (review_scores.rating) ?

```bash
db.listingsAndReviews.find(
  {},
  { name: 1, "review_scores.rating": 1, _id: 0 }
)
.sort({ "review_scores.rating": -1 })
.limit(5)
```

Exercice 12 : Prix moyen par type de logement
- Question : Quel est le prix moyen (price) pour chaque valeur de property_type ?

```bash
db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: "$property_type",
      averagePrice: { $avg: "$price" }
    }
  }
])
```

Exercice 13 : Nombre total de lits par pays
- Question : Pour chaque pays, combien de lits (beds) au total ?

```bash
db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: "$address.country",
      totalBeds: { $sum: "$beds" }
    }
  }
])
```

Exercice 14 : Lister les annonces les plus chères par pays
- Question : Pour chaque pays, trouver l’annonce qui a le price le plus élevé

```bash
db.listingsAndReviews.aggregate([
  { $sort: { "price": -1 } },
  {
    $group: {
      _id: "$address.country",
      mostExpensiveListing: { $first: "$$ROOT" }
    }
  }
])
```

Exercice 15 : Requêtes combinées (aggrégations multi-étapes)
- Question : Parmi les annonces au Canada, afficher uniquement celles ayant un price supérieur à 100, trier par number_of_reviews décroissant, puis prendre les 10 premières annonces.

```bash
db.listingsAndReviews.find(
  { "address.country": "Canada", price: { $gt: 100 } }
).sort({ number_of_reviews: -1 }).limit(10)
```

Exercice 16 : Analyser les équipements (amenities) – Unwind
- Question : Quel est l’équipement le plus fréquent dans les annonces en Brazil ?

```bash
db.listingsAndReviews.aggregate([
  { $match: { "address.country": "Brazil" } },
  { $unwind: "$amenities" },
  { $group: { _id: "$amenities", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])
```
