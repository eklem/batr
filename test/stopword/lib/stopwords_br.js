// Copyright (c) 2017 Peter Graham, contributors. Released under the Apache-2.0 license.

var words = [
  'a', 'ainda', 'alem', 'ambas', 'ambos', 'antes', 'ao', 'aonde', 'aos',
  'apos', 'aquele', 'aqueles', 'as', 'assim', 'com', 'como', 'contra',
  'contudo', 'cuja', 'cujas', 'cujo', 'cujos', 'da', 'das', 'de', 'dela',
  'dele', 'deles', 'demais', 'depois', 'desde', 'desta', 'deste', 'dispoe',
  'dispoem', 'diversa', 'diversas', 'diversos', 'do', 'dos', 'durante', 'e',
  'ela', 'elas', 'ele', 'eles', 'em', 'entao', 'entre', 'essa', 'essas',
  'esse', 'esses', 'esta', 'estas', 'este', 'estes', 'ha', 'isso', 'isto',
  'logo', 'mais', 'mas', 'mediante', 'menos', 'mesma', 'mesmas', 'mesmo',
  'mesmos', 'na', 'nao', 'nas', 'nem', 'nesse', 'neste', 'nos', 'o', 'os',
  'ou', 'outra', 'outras', 'outro', 'outros', 'pelas', 'pelo', 'pelos',
  'perante', 'pois', 'por', 'porque', 'portanto', 'propios', 'proprio',
  'quais', 'qual', 'qualquer', 'quando', 'quanto', 'que', 'quem', 'quer', 'se',
  'seja', 'sem', 'sendo', 'seu', 'seus', 'sob', 'sobre', 'sua', 'suas', 'tal',
  'tambem', 'teu', 'teus', 'toda', 'todas', 'todo', 'todos', 'tua', 'tuas',
  'tudo', 'um', 'uma', 'umas', 'uns'
]

// tell the world about the noise words.
exports.words = words