import { FormInput, Option, Type } from 'models/formInput'
import React from 'react'
import * as Asset from 'assets'

const optionsToken = [
  {
    name: 'USDS',
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
const options = [
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
export const Forms: FormInput[] = [
  {
    location: 'infomation',
    control: [
      {
        title: 'Title',
        type: Type.Input,
        id: 'name',
        placeHolder: 'e.g.Remdemable T-Shirt with logo',
        panel: '',
      },
      {
        title: 'description',
        type: Type.Input,

        id: 'description',
        placeHolder: `e.g.After purchasing you'll be able to get the real T-shirt`,

        panel: 'With preserved line-breaks',
      },
    ],
  },
  {
    location: 'bids',
    control: [
      {
        title: 'Minimum bid',
        type: Type.InputDropdown,
        id: 'bid',
        placeHolder: 'Enter price for one piece ...',
        panel: 'Bids below this amount won’t be allowed.',
      },
      {
        title: 'Starting Date',
        type: Type.Dropdown,
        id: 'startingDate',
        option: options,
      },
      {
        title: 'Expiration Date',
        type: Type.Dropdown,
        id: 'ExpirationDate',
        option: options,
      },
    ],
  },
  {
    location: 'price',
    control: [
      {
        title: 'Price',
        type: Type.InputDropdown,
        id: 'price',
        placeHolder: 'Enter price for one piece ...',
        panel: 'Service fee 2.5%',
        option: optionsToken,
      },
    ],
  },
]
