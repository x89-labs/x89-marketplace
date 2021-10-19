import { FormInput, Type } from 'models/formInput'
import React from 'react'
import * as Asset from 'assets'
import * as Yup from 'yup'

const optionsToken = [
  {
    name: 'USDC',
    icon: <img src={Asset.SrcUSDC} width={20} height={20} />,
    id: '1',
  },
  {
    name: 'ETH',
    icon: <Asset.Ethereum width={20} height={20} />,
    id: '2',
  },
  {
    name: 'BTC',
    icon: <Asset.BitCoin width={20} height={20} />,
    id: '3',
  },
]
const startDate = [
  {
    name: 'Right after listing',
    id: '1',
  },
  {
    name: 'Pick spicific date',
    id: '2',
    type: 'DatePicker',
  },
]
const ExpirationDate = [
  {
    name: '1 day',
    id: '1',
  },
  {
    name: '2 day',
    id: '2',
  },
  {
    name: '3 day',
    id: '3',
  },
  {
    name: '7 day',
    id: '4',
  },
  {
    name: 'Pick spicific date',
    id: '5',
    type: 'DatePicker',
  },
]

export const Forms: FormInput[] = [
  {
    location: 'infomation',
    row: [1, 2, 3],
    control: [
      {
        row: 1,
        title: 'Title',
        type: Type.Input,
        id: 'name',
        placeHolder: 'e.g.Remdemable T-Shirt with logo',
        panel: '',
      },
      {
        row: 2,
        title: 'Description ',
        titleSmall: '(Optional)',
        type: Type.Input,
        id: 'descriptions',
        placeHolder: `e.g.After purchasing you'll be able to get the real T-shirt`,
        panel: 'With preserved line-breaks',
      },
      {
        row: 1,
        title: 'Royalties',
        type: Type.InputNumber,
        id: 'royalties',
        placeHolder: `e.g. 10%`,
        panel: 'Suggested: 0%, 10%, 20%, 30%. Maximum is 50%',
      },
    ],
  },
  {
    location: 'bids',
    row: [1, 2, 3],
    control: [
      {
        row: 1,
        title: 'Minimum bid',
        type: Type.InputDropdown,
        id: 'bid',
        placeHolder: 'Enter price for one piece ...',
        panel: 'Bids below this amount won’t be allowed.',
        option: optionsToken,
      },
      {
        row: 2,
        title: 'Starting Date',
        type: Type.Dropdown,
        id: 'startingDate',
        option: startDate,
      },
      {
        row: 3,
        title: 'Expiration Date',
        type: Type.Dropdown,
        id: 'ExpirationDate',
        option: ExpirationDate,
      },
    ],
  },
  {
    location: 'price',
    row: [1],
    control: [
      {
        row: 1,
        title: 'Price',
        type: Type.InputDropdown,
        id: 'price',
        idDropdown: 'symbol',
        placeHolder: 'Enter price for one piece ...',
        panel: 'Service fee 2.5%',
        panel1: 'You will receive 0 ETH',
        option: optionsToken,
      },
    ],
  },
  {
    location: 'multiple',
    row: [1],
    control: [
      {
        row: 1,
        title: 'Number of copies',
        type: Type.Input,
        id: 'numberOfCopies',
        placeHolder: 'E.g 10',
        panel: 'Amount of tokens',
      },
    ],
  },
  {
    location: 'advance',
    row: [1, 2],
    control: [
      {
        row: 1,
        title: 'Properties ',
        titleSmall: '(Optional)',
        type: Type.Input,
        id: 'totalQuantity',
        placeHolder: 'e.g. Size',
        panel: '',
        width: '50%',
      },
      {
        row: 1,
        title: '',
        type: Type.Input,
        id: 'totalQuantity',
        placeHolder: 'e.g.M',
        panel: '',
        width: '50%',
      },
      {
        row: 2,
        title: 'Alternative text for NFT ',
        titleSmall: '(Optional)',
        type: Type.Input,
        id: 'totalQuantity',
        placeHolder: 'Image description in details (do not start with the word “image”)',
        panel: 'Text that will be used in VoiceOver for people with disabilities',
      },
    ],
  },
]

export const validationFormCreateSchema = Yup.object().shape({
  name: Yup.string().required('* Field Required'),
  price: Yup.string().required('* Field Required'),
  symbol: Yup.string().required('* Field Required'),
  description: Yup.string().required('* Field Required'),
})

export const EditForm = [
  {
    id: 'displayName',
    title: 'Display name',
    placeholder: 'Enter your display name',
  },
  {
    id: 'customURL',
    title: 'Custom URL',
    placeholder: 'app.polrare.co/ Enter short URL',
    description: 'Customize your URL on Polrare Market. Must only contain lowercase letters, numbers, and hyphens.',
  },
  {
    id: 'bio',
    title: 'Bio ',
    placeholder: 'Write about yourself in a few words',
  },
  {
    id: 'personalSite',
    title: 'Personal site or portfolio',
    placeholder: 'https://',
    description: 'Display name',
  },
  {
    id: 'emailE',
    title: 'Email  (Optional)',
    placeholder: 'Your email for marketplace notifications',
  },
]
