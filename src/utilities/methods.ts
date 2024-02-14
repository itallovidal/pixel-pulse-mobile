import { GENRES, IComment, IGame, IRatedGame } from '../@types/game'
import { Text } from 'native-base'
import React from 'react'

export function getGenreName(genres: number[]) {
  const translated = GENRES.filter((gen) => {
    return !!genres.find((g) => g === gen.id)
  })
  return `${translated[0].brName} | ${translated[1].brName}`
}

export function formatListOfContents(data: { name: string }[]) {
  return data.map((item, index) => {
    return `${item.name} ${index === data.length - 1 ? '' : ' | '}`
  })
}
