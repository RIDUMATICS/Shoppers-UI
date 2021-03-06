const countries = [
  {
    name: 'Afghanistan',
    callingCodes: '93',
  },
  {
    name: 'Åland Islands',
    callingCodes: '358',
  },
  {
    name: 'Albania',
    callingCodes: '355',
  },
  {
    name: 'Algeria',
    callingCodes: '213',
  },
  {
    name: 'American Samoa',
    callingCodes: '1684',
  },
  {
    name: 'Andorra',
    callingCodes: '376',
  },
  {
    name: 'Angola',
    callingCodes: '244',
  },
  {
    name: 'Anguilla',
    callingCodes: '1264',
  },
  {
    name: 'Antarctica',
    callingCodes: '672',
  },
  {
    name: 'Antigua and Barbuda',
    callingCodes: '1268',
  },
  {
    name: 'Argentina',
    callingCodes: '54',
  },
  {
    name: 'Armenia',
    callingCodes: '374',
  },
  {
    name: 'Aruba',
    callingCodes: '297',
  },
  {
    name: 'Australia',
    callingCodes: '61',
  },
  {
    name: 'Austria',
    callingCodes: '43',
  },
  {
    name: 'Azerbaijan',
    callingCodes: '994',
  },
  {
    name: 'Bahamas',
    callingCodes: '1242',
  },
  {
    name: 'Bahrain',
    callingCodes: '973',
  },
  {
    name: 'Bangladesh',
    callingCodes: '880',
  },
  {
    name: 'Barbados',
    callingCodes: '1246',
  },
  {
    name: 'Belarus',
    callingCodes: '375',
  },
  {
    name: 'Belgium',
    callingCodes: '32',
  },
  {
    name: 'Belize',
    callingCodes: '501',
  },
  {
    name: 'Benin',
    callingCodes: '229',
  },
  {
    name: 'Bermuda',
    callingCodes: '1441',
  },
  {
    name: 'Bhutan',
    callingCodes: '975',
  },
  {
    name: 'Bolivia (Plurinational State of)',
    callingCodes: '591',
  },
  {
    name: 'Bonaire, Sint Eustatius and Saba',
    callingCodes: '5997',
  },
  {
    name: 'Bosnia and Herzegovina',
    callingCodes: '387',
  },
  {
    name: 'Botswana',
    callingCodes: '267',
  },
  {
    name: 'Bouvet Island',
    callingCodes: '',
  },
  {
    name: 'Brazil',
    callingCodes: '55',
  },
  {
    name: 'British Indian Ocean Territory',
    callingCodes: '246',
  },
  {
    name: 'United States Minor Outlying Islands',
    callingCodes: '',
  },
  {
    name: 'Virgin Islands (British)',
    callingCodes: '1284',
  },
  {
    name: 'Virgin Islands (U.S.)',
    callingCodes: '1 340',
  },
  {
    name: 'Brunei Darussalam',
    callingCodes: '673',
  },
  {
    name: 'Bulgaria',
    callingCodes: '359',
  },
  {
    name: 'Burkina Faso',
    callingCodes: '226',
  },
  {
    name: 'Burundi',
    callingCodes: '257',
  },
  {
    name: 'Cambodia',
    callingCodes: '855',
  },
  {
    name: 'Cameroon',
    callingCodes: '237',
  },
  {
    name: 'Canada',
    callingCodes: '1',
  },
  {
    name: 'Cabo Verde',
    callingCodes: '238',
  },
  {
    name: 'Cayman Islands',
    callingCodes: '1345',
  },
  {
    name: 'Central African Republic',
    callingCodes: '236',
  },
  {
    name: 'Chad',
    callingCodes: '235',
  },
  {
    name: 'Chile',
    callingCodes: '56',
  },
  {
    name: 'China',
    callingCodes: '86',
  },
  {
    name: 'Christmas Island',
    callingCodes: '61',
  },
  {
    name: 'Cocos (Keeling) Islands',
    callingCodes: '61',
  },
  {
    name: 'Colombia',
    callingCodes: '57',
  },
  {
    name: 'Comoros',
    callingCodes: '269',
  },
  {
    name: 'Congo',
    callingCodes: '242',
  },
  {
    name: 'Congo (Democratic Republic of the)',
    callingCodes: '243',
  },
  {
    name: 'Cook Islands',
    callingCodes: '682',
  },
  {
    name: 'Costa Rica',
    callingCodes: '506',
  },
  {
    name: 'Croatia',
    callingCodes: '385',
  },
  {
    name: 'Cuba',
    callingCodes: '53',
  },
  {
    name: 'Curaçao',
    callingCodes: '599',
  },
  {
    name: 'Cyprus',
    callingCodes: '357',
  },
  {
    name: 'Czech Republic',
    callingCodes: '420',
  },
  {
    name: 'Denmark',
    callingCodes: '45',
  },
  {
    name: 'Djibouti',
    callingCodes: '253',
  },
  {
    name: 'Dominica',
    callingCodes: '1767',
  },
  {
    name: 'Dominican Republic',
    callingCodes: '1809',
  },
  {
    name: 'Ecuador',
    callingCodes: '593',
  },
  {
    name: 'Egypt',
    callingCodes: '20',
  },
  {
    name: 'El Salvador',
    callingCodes: '503',
  },
  {
    name: 'Equatorial Guinea',
    callingCodes: '240',
  },
  {
    name: 'Eritrea',
    callingCodes: '291',
  },
  {
    name: 'Estonia',
    callingCodes: '372',
  },
  {
    name: 'Ethiopia',
    callingCodes: '251',
  },
  {
    name: 'Falkland Islands (Malvinas)',
    callingCodes: '500',
  },
  {
    name: 'Faroe Islands',
    callingCodes: '298',
  },
  {
    name: 'Fiji',
    callingCodes: '679',
  },
  {
    name: 'Finland',
    callingCodes: '358',
  },
  {
    name: 'France',
    callingCodes: '33',
  },
  {
    name: 'French Guiana',
    callingCodes: '594',
  },
  {
    name: 'French Polynesia',
    callingCodes: '689',
  },
  {
    name: 'French Southern Territories',
    callingCodes: '',
  },
  {
    name: 'Gabon',
    callingCodes: '241',
  },
  {
    name: 'Gambia',
    callingCodes: '220',
  },
  {
    name: 'Georgia',
    callingCodes: '995',
  },
  {
    name: 'Germany',
    callingCodes: '49',
  },
  {
    name: 'Ghana',
    callingCodes: '233',
  },
  {
    name: 'Gibraltar',
    callingCodes: '350',
  },
  {
    name: 'Greece',
    callingCodes: '30',
  },
  {
    name: 'Greenland',
    callingCodes: '299',
  },
  {
    name: 'Grenada',
    callingCodes: '1473',
  },
  {
    name: 'Guadeloupe',
    callingCodes: '590',
  },
  {
    name: 'Guam',
    callingCodes: '1671',
  },
  {
    name: 'Guatemala',
    callingCodes: '502',
  },
  {
    name: 'Guernsey',
    callingCodes: '44',
  },
  {
    name: 'Guinea',
    callingCodes: '224',
  },
  {
    name: 'Guinea-Bissau',
    callingCodes: '245',
  },
  {
    name: 'Guyana',
    callingCodes: '592',
  },
  {
    name: 'Haiti',
    callingCodes: '509',
  },
  {
    name: 'Heard Island and McDonald Islands',
    callingCodes: '',
  },
  {
    name: 'Holy See',
    callingCodes: '379',
  },
  {
    name: 'Honduras',
    callingCodes: '504',
  },
  {
    name: 'Hong Kong',
    callingCodes: '852',
  },
  {
    name: 'Hungary',
    callingCodes: '36',
  },
  {
    name: 'Iceland',
    callingCodes: '354',
  },
  {
    name: 'India',
    callingCodes: '91',
  },
  {
    name: 'Indonesia',
    callingCodes: '62',
  },
  {
    name: "Côte d'Ivoire",
    callingCodes: '225',
  },
  {
    name: 'Iran (Islamic Republic of)',
    callingCodes: '98',
  },
  {
    name: 'Iraq',
    callingCodes: '964',
  },
  {
    name: 'Ireland',
    callingCodes: '353',
  },
  {
    name: 'Isle of Man',
    callingCodes: '44',
  },
  {
    name: 'Israel',
    callingCodes: '972',
  },
  {
    name: 'Italy',
    callingCodes: '39',
  },
  {
    name: 'Jamaica',
    callingCodes: '1876',
  },
  {
    name: 'Japan',
    callingCodes: '81',
  },
  {
    name: 'Jersey',
    callingCodes: '44',
  },
  {
    name: 'Jordan',
    callingCodes: '962',
  },
  {
    name: 'Kazakhstan',
    callingCodes: '76',
  },
  {
    name: 'Kenya',
    callingCodes: '254',
  },
  {
    name: 'Kiribati',
    callingCodes: '686',
  },
  {
    name: 'Kuwait',
    callingCodes: '965',
  },
  {
    name: 'Kyrgyzstan',
    callingCodes: '996',
  },
  {
    name: "Lao People's Democratic Republic",
    callingCodes: '856',
  },
  {
    name: 'Latvia',
    callingCodes: '371',
  },
  {
    name: 'Lebanon',
    callingCodes: '961',
  },
  {
    name: 'Lesotho',
    callingCodes: '266',
  },
  {
    name: 'Liberia',
    callingCodes: '231',
  },
  {
    name: 'Libya',
    callingCodes: '218',
  },
  {
    name: 'Liechtenstein',
    callingCodes: '423',
  },
  {
    name: 'Lithuania',
    callingCodes: '370',
  },
  {
    name: 'Luxembourg',
    callingCodes: '352',
  },
  {
    name: 'Macao',
    callingCodes: '853',
  },
  {
    name: 'Macedonia (the former Yugoslav Republic of)',
    callingCodes: '389',
  },
  {
    name: 'Madagascar',
    callingCodes: '261',
  },
  {
    name: 'Malawi',
    callingCodes: '265',
  },
  {
    name: 'Malaysia',
    callingCodes: '60',
  },
  {
    name: 'Maldives',
    callingCodes: '960',
  },
  {
    name: 'Mali',
    callingCodes: '223',
  },
  {
    name: 'Malta',
    callingCodes: '356',
  },
  {
    name: 'Marshall Islands',
    callingCodes: '692',
  },
  {
    name: 'Martinique',
    callingCodes: '596',
  },
  {
    name: 'Mauritania',
    callingCodes: '222',
  },
  {
    name: 'Mauritius',
    callingCodes: '230',
  },
  {
    name: 'Mayotte',
    callingCodes: '262',
  },
  {
    name: 'Mexico',
    callingCodes: '52',
  },
  {
    name: 'Micronesia (Federated States of)',
    callingCodes: '691',
  },
  {
    name: 'Moldova (Republic of)',
    callingCodes: '373',
  },
  {
    name: 'Monaco',
    callingCodes: '377',
  },
  {
    name: 'Mongolia',
    callingCodes: '976',
  },
  {
    name: 'Montenegro',
    callingCodes: '382',
  },
  {
    name: 'Montserrat',
    callingCodes: '1664',
  },
  {
    name: 'Morocco',
    callingCodes: '212',
  },
  {
    name: 'Mozambique',
    callingCodes: '258',
  },
  {
    name: 'Myanmar',
    callingCodes: '95',
  },
  {
    name: 'Namibia',
    callingCodes: '264',
  },
  {
    name: 'Nauru',
    callingCodes: '674',
  },
  {
    name: 'Nepal',
    callingCodes: '977',
  },
  {
    name: 'Netherlands',
    callingCodes: '31',
  },
  {
    name: 'New Caledonia',
    callingCodes: '687',
  },
  {
    name: 'New Zealand',
    callingCodes: '64',
  },
  {
    name: 'Nicaragua',
    callingCodes: '505',
  },
  {
    name: 'Niger',
    callingCodes: '227',
  },
  {
    name: 'Nigeria',
    callingCodes: '234',
  },
  {
    name: 'Niue',
    callingCodes: '683',
  },
  {
    name: 'Norfolk Island',
    callingCodes: '672',
  },
  {
    name: "Korea (Democratic People's Republic of)",
    callingCodes: '850',
  },
  {
    name: 'Northern Mariana Islands',
    callingCodes: '1670',
  },
  {
    name: 'Norway',
    callingCodes: '47',
  },
  {
    name: 'Oman',
    callingCodes: '968',
  },
  {
    name: 'Pakistan',
    callingCodes: '92',
  },
  {
    name: 'Palau',
    callingCodes: '680',
  },
  {
    name: 'Palestine, State of',
    callingCodes: '970',
  },
  {
    name: 'Panama',
    callingCodes: '507',
  },
  {
    name: 'Papua New Guinea',
    callingCodes: '675',
  },
  {
    name: 'Paraguay',
    callingCodes: '595',
  },
  {
    name: 'Peru',
    callingCodes: '51',
  },
  {
    name: 'Philippines',
    callingCodes: '63',
  },
  {
    name: 'Pitcairn',
    callingCodes: '64',
  },
  {
    name: 'Poland',
    callingCodes: '48',
  },
  {
    name: 'Portugal',
    callingCodes: '351',
  },
  {
    name: 'Puerto Rico',
    callingCodes: '1787',
  },
  {
    name: 'Qatar',
    callingCodes: '974',
  },
  {
    name: 'Republic of Kosovo',
    callingCodes: '383',
  },
  {
    name: 'Réunion',
    callingCodes: '262',
  },
  {
    name: 'Romania',
    callingCodes: '40',
  },
  {
    name: 'Russian Federation',
    callingCodes: '7',
  },
  {
    name: 'Rwanda',
    callingCodes: '250',
  },
  {
    name: 'Saint Barthélemy',
    callingCodes: '590',
  },
  {
    name: 'Saint Helena, Ascension and Tristan da Cunha',
    callingCodes: '290',
  },
  {
    name: 'Saint Kitts and Nevis',
    callingCodes: '1869',
  },
  {
    name: 'Saint Lucia',
    callingCodes: '1758',
  },
  {
    name: 'Saint Martin (French part)',
    callingCodes: '590',
  },
  {
    name: 'Saint Pierre and Miquelon',
    callingCodes: '508',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    callingCodes: '1784',
  },
  {
    name: 'Samoa',
    callingCodes: '685',
  },
  {
    name: 'San Marino',
    callingCodes: '378',
  },
  {
    name: 'Sao Tome and Principe',
    callingCodes: '239',
  },
  {
    name: 'Saudi Arabia',
    callingCodes: '966',
  },
  {
    name: 'Senegal',
    callingCodes: '221',
  },
  {
    name: 'Serbia',
    callingCodes: '381',
  },
  {
    name: 'Seychelles',
    callingCodes: '248',
  },
  {
    name: 'Sierra Leone',
    callingCodes: '232',
  },
  {
    name: 'Singapore',
    callingCodes: '65',
  },
  {
    name: 'Sint Maarten (Dutch part)',
    callingCodes: '1721',
  },
  {
    name: 'Slovakia',
    callingCodes: '421',
  },
  {
    name: 'Slovenia',
    callingCodes: '386',
  },
  {
    name: 'Solomon Islands',
    callingCodes: '677',
  },
  {
    name: 'Somalia',
    callingCodes: '252',
  },
  {
    name: 'South Africa',
    callingCodes: '27',
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    callingCodes: '500',
  },
  {
    name: 'Korea (Republic of)',
    callingCodes: '82',
  },
  {
    name: 'South Sudan',
    callingCodes: '211',
  },
  {
    name: 'Spain',
    callingCodes: '34',
  },
  {
    name: 'Sri Lanka',
    callingCodes: '94',
  },
  {
    name: 'Sudan',
    callingCodes: '249',
  },
  {
    name: 'Suriname',
    callingCodes: '597',
  },
  {
    name: 'Svalbard and Jan Mayen',
    callingCodes: '4779',
  },
  {
    name: 'Swaziland',
    callingCodes: '268',
  },
  {
    name: 'Sweden',
    callingCodes: '46',
  },
  {
    name: 'Switzerland',
    callingCodes: '41',
  },
  {
    name: 'Syrian Arab Republic',
    callingCodes: '963',
  },
  {
    name: 'Taiwan',
    callingCodes: '886',
  },
  {
    name: 'Tajikistan',
    callingCodes: '992',
  },
  {
    name: 'Tanzania, United Republic of',
    callingCodes: '255',
  },
  {
    name: 'Thailand',
    callingCodes: '66',
  },
  {
    name: 'Timor-Leste',
    callingCodes: '670',
  },
  {
    name: 'Togo',
    callingCodes: '228',
  },
  {
    name: 'Tokelau',
    callingCodes: '690',
  },
  {
    name: 'Tonga',
    callingCodes: '676',
  },
  {
    name: 'Trinidad and Tobago',
    callingCodes: '1868',
  },
  {
    name: 'Tunisia',
    callingCodes: '216',
  },
  {
    name: 'Turkey',
    callingCodes: '90',
  },
  {
    name: 'Turkmenistan',
    callingCodes: '993',
  },
  {
    name: 'Turks and Caicos Islands',
    callingCodes: '1649',
  },
  {
    name: 'Tuvalu',
    callingCodes: '688',
  },
  {
    name: 'Uganda',
    callingCodes: '256',
  },
  {
    name: 'Ukraine',
    callingCodes: '380',
  },
  {
    name: 'United Arab Emirates',
    callingCodes: '971',
  },
  {
    name: 'United Kingdom of Great Britain and Northern Ireland',
    callingCodes: '44',
  },
  {
    name: 'United States of America',
    callingCodes: '1',
  },
  {
    name: 'Uruguay',
    callingCodes: '598',
  },
  {
    name: 'Uzbekistan',
    callingCodes: '998',
  },
  {
    name: 'Vanuatu',
    callingCodes: '678',
  },
  {
    name: 'Venezuela (Bolivarian Republic of)',
    callingCodes: '58',
  },
  {
    name: 'Viet Nam',
    callingCodes: '84',
  },
  {
    name: 'Wallis and Futuna',
    callingCodes: '681',
  },
  {
    name: 'Western Sahara',
    callingCodes: '212',
  },
  {
    name: 'Yemen',
    callingCodes: '967',
  },
  {
    name: 'Zambia',
    callingCodes: '260',
  },
  {
    name: 'Zimbabwe',
    callingCodes: '263',
  },
];

export default countries;
