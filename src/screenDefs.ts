import { ScreenType } from './IntroScreen'

const wcmcScreens: ScreenType[] = [
  {
    backgroundColor: '#03a847',
    title: 'Welcome to Mapeo',
    description:
      'Mapeo is for mapping your territory and documenting evidence of deforestation and contamination.',
    image: require('../assets/mapeo-logo-transparent.png'),
    moreLink: 'Who built Mapeo?',
    moreText: `
Mapeo was developed by Digital Democracy in close collaboration with indigenous
partners in the Amazon rainforest, including Achuar, Cocama, Harakbut, Kofan,
Kichwa, Matsiguenka, Siekopai, Wapichana, Waorani and Yine peoples.

For more information and case studies about how it is being used see: www.mapeo.app
`,
  },
  {
    backgroundColor: '#d1ffd8',
    title: 'ICCAs',
    description:
      'You can use Mapeo to collect data about an area your community is conserving. These are sometimes called ICCAs',
    moreLink: 'What is an ICCA?',
    moreText: `
An ICCA is any area conserved and protected by a local community or indigenous
people. If you register your community protected area with WCMC (the World
Conservation Monitoring Centre), then it will be placed on a global database and
map, allowing other institutions and international bodies to know about the work
you are doing to preserve your territory and the environment.

ICCAs have three key characteristics:

1. The indigenous people or local community has a deep connection with their territory or area;
2. The decisions about how the territory or area is managed are made by the indigenous people or local community;
3. The management of the territory or area results in the conservation of biodiversity.

Find out more about ICCAs, and the ICCA consortium see: www.iccaconsortium.org
`,
    image: require('../assets/drawkit-nature-man-colour-800px.png'),
  },
  {
    backgroundColor: '#8ac9d1',
    title: 'Register your ICCA with UNEP-WCMC',
    description:
      'Registering the area you are protecting will show the contribution that indigenous peoples and local communities make to conservation efforts.',
    image: require('../assets/undraw_connected_world_wuay.png'),
    moreLink: 'What is UNEP-WCMC and how will they use my data?',
    moreTitle: 'Use of Information',
    moreText: `
If you are a member of an indigenous people or local community, you can choose
to provide information about your conserved area (ICCA) to the UN Environment
World Conservation Monitoring Centre (UNEP-WCMC). UNEP-WCMC manages information
on ICCAs in order to demonstrate how important the contributions of indigenous
peoples and local communities are for the conservation of our natural world.

Through the app, you can provide information on the outer boundary and location
of your ICCA, alongside information on its basic characteristics. If you would
also like to provide more in-depth information, photos, and links to further
information, you can contact us to discuss sharing a case study through the ICCA
Registry website.

Information is gathered through a series of questions that you can answer within
Mapeo. No information will be sent to UNEP-WCMC until you decide to share it.
The information you share will be added to a global registry of ICCAs.

If one of the main objectives of the ICCA is to conserve nature you can also
choose to include your information in the World Database on Protected Areas
(WDPA). This differs from the ICCA Registry because it stores information on
many different conservation measures, including those managed by governments,
private organisations and individuals, and indigenous peoples and local
communities. This database is widely-used by people around the world to help
them make decisions about how land and waters are managed.

By providing information to these databases, communities will help the
international community to appreciate the vital connection between indigenous
peoples, local communities and biodiversity conservation. It also helps people
around the world have an awareness of  ICCAs when they make decisions.

However, communities should also consider whether they might face challenges as
a result of making their information public. More information on potential
benefits, and important issues to consider, is available at:
www.iccaregistry.org/en/participate/benefits-and-considerations
`,
  },
  {
    backgroundColor: '#13467d',
    title: 'Collecting data',
    description:
      'Head out to your ICCA and press the orange ＋ button to record a GPS point.',
    image: require('../assets/mapeo-map-screen.png'),
  },
  {
    backgroundColor: '#45228f',
    title: 'Choose a category',
    description:
      'You can record points along the boundary of your ICCA, or important points inside the area.',
    image: require('../assets/wcmc-categories-screen.png'),
  },
  {
    backgroundColor: '#d3a4ed',
    title: 'Add photos and details',
    description:
      'Add a description of the point. You can also add photos and other details. Then save the point, pressing the orange tick.',
    image: require('../assets/mapeo-new-observation-screen.png'),
  },
  {
    backgroundColor: '#f0a5dc',
    title: 'Sync with Mapeo Desktop',
    description:
      'Back in your community you can sync your points with Mapeo Desktop to get them onto a laptop, and use them to draw the ICCA boundary.',
    image: require('../assets/mapeo-sync-screen.png'),
  },

  {
    backgroundColor: '#a82c49',
    title: 'Send to UNEP-WCMC',
    description:
      'Once your community has approved the area you can send it to UNEP-WCMC. They will review it and then publish it online.',
    image: require('../assets/undraw_software_engineer_lvl5.png'),
    moreLink: 'How will UNEP-WCMC use your data?',
    moreTitle: 'Use of your data',
    moreText: `
Before your information is made public a member of staff from UNEP WCMC will
contact you with any questions. Your data will then be submitted for others to
review. This is a peer-review process, and ensures that the information
published in the databases is accurate. Peer-review is carried out by other
indigenous peoples and/or local communities, and sometimes facilitating
organisations, in the country where the ICCA is located.

After review, your data will be published on xxxxxx.

Something about intellectual property
`,
  },
  {
    backgroundColor: '#fc9f14',
    title: 'Enjoy Mapeo!',
    description: 'Tap the tick to start using Mapeo.',
    image: require('../assets/undraw_High_five_u364.png'),
    moreLink: 'More help',
    moreText: `
If you have any trouble contact UNEP-WCMC: iccaregistry@unep-wcmc.org
`,
  },
]

export default wcmcScreens
