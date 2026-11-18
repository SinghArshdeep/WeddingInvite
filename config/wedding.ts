export interface Couple {
  firstName: string
  secondName: string
}

export interface Families {
  first: string
  second: string
}

export interface WeddingDateConfig {
  /** ISO calendar date, YYYY-MM-DD */
  date: string
  /** 24-hour local time at the wedding, HH:mm */
  time: string
  /** IANA timezone of the wedding */
  timeZone: string
}

export interface Memory {
  src: string
  alt: string
  caption: string
}

export interface CelebrationEvent {
  src: string
  alt: string
  width: number
  height: number
  /** Optional name shown under the card. Leave empty until confirmed. */
  title?: string
  description?: string
}

export interface WeddingConfig {
  couple: Couple
  families: Families
  blessings: string[]
  wedding: WeddingDateConfig
  music: { src: string }
  memories: Memory[]
  events: CelebrationEvent[]
  gurbani: {
  gurmukhi: string[]
}
}

export const weddingConfig: WeddingConfig = {
  couple: {
    firstName: 'Jasneet',
    secondName: 'Harpreet',
  },

  families: {
    first: 'Bhogal',
    second: 'Rayat',
  },

  blessings: ['Avtar Singh & Baljeet Kaur', 'Prakash Singh & Amarjeet Kaur'],

  wedding: {
    date: '2026-12-11',
    time: '00:00',
    timeZone: 'Asia/Kolkata',
  },

  music: {
    src: '/audio/wedding-instrumental.mp3',
  },
  gurbani: {
    gurmukhi: [
      'ਸਭੁ ਕਿਛੁ ਵਸਗਤਿ ਸਾਹਿਬੈ ਆਪੇ ਕਰਣ ਕਰੇਵ ॥',
      'ਸਤਿਗੁਰ ਕੈ ਬਲਿਹਾਰਣੈ ਮਨਸਾ ਸਭੁ ਪੂਰੇਵ ॥੩॥',
    ],
  },

  memories: [
    {
      src: '/images/memories/moment-11.jpeg',
      alt: 'Two cups of chai beside a sunlit window',
      caption: 'Where the story began.',
    },
    {
      src: '/images/memories/moment-07.jpeg',
      alt: 'Two hands intertwined, one adorned with mehndi',
      caption: 'A moment.',
    },
    {
      src: '/images/memories/moment-08.jpeg',
      alt: 'Marigold garlands and glowing diyas at an evening celebration',
      caption: 'A lifetime of celebrations.',
    },
    {
      src: '/images/memories/moment-09.jpeg',
      alt: 'Roses resting on an embroidered phulkari shawl',
      caption: 'Little moments, endless memories.',
    },
    {
      src: '/images/memories/moment-12.jpeg',
      alt: 'A golden mustard field at sunset',
      caption: 'Forever starts here.',
    },
  ],

  events: [
    {
      src: '/images/events/event-06.png',
      alt: 'Event invitation one (placeholder design)',
      width: 848,
      height: 1264,
    },
    {
      src: '/images/events/event-07.png',
      alt: 'Event invitation three (placeholder design)',
      width: 848,
      height: 1264,
    },
  ],
}
