
export type Media = {
    emblem?: string,
    flag?: string,
    orthographic?:string
}

export type Country = {
    abbreviation?: string,
    capital?: string,
    currency?: string,
    id?:number,
    media?:Media,
    name?: string,
    phCode?: string,
    population?: number,

  }

  export type FilterItem={countryName:string, population:number}

  