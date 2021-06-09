import cryptoRandomString from 'crypto-random-string'
import { v4 as uuidv4 } from 'uuid'

const getRandomString = (length: number): string => cryptoRandomString({ length })

const getRandomToken = (): string => uuidv4()

const queryKeyExist = <T extends Object>(target: T, key: string): boolean => target.hasOwnProperty(key)

export {
  getRandomString,
  getRandomToken,
  queryKeyExist
}