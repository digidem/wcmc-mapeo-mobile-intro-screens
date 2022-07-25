import { ScreenType } from './IntroScreen'

const wcmcScreens: ScreenType[] = [
  {
    backgroundColor: '#03a847',
    title: 'Welcome to Mapeo for ICCAs',
    description:
      'Mapeo for ICCAs was developed specifically to support the mapping of ICCA boundaries and includes the option of submitting the ICCA information to UNEP-WCMC.',
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
"Mapeo for ICCAs" is for indigenous peoples and local communities whose knowledge and practices result in the conservation of nature within an area or territory under their governance. Such territories and areas are often referred to as ‘ICCAs’.
ICCAs have three key characteristics:

1. An indigenous people or local community has a close and profound relationship with its territory or area.
2. Decisions about how to manage the territory or area are made primarily by the people or community.
3. The people’s or community’s decisions and efforts lead to the conservation of biodiversity, ecological functions and associated cultural values, regardless of the primary objectives of management.
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
If you are a member of an indigenous people or local community with an ICCA, you can choose to provide information to the UN Environment Programme World Conservation Monitoring Centre (UNEP-WCMC). UNEP-WCMC manages information on ICCAs in order to demonstrate how important the contributions of indigenous peoples and local communities are for the conservation of our natural world. This information is stored in the global ICCA Registry (currently offline).

Through the the Mapeo Desktop app, you can provide information on the outer boundary and location of your ICCA, alongside information on its basic characteristics. No information will be sent to UNEP-WCMC until you decide to share it. If you would also like your ICCA to be online, you can contact us to discuss sharing a case study through the ICCA Registry website. This is an opportunity to provide more in-depth details, photos, and links to further information.

Contact us via email: mailto:iccaregistry@unep-wcmc.org

When communities provide information to the ICCA Registry, they help the international community to appreciate the vital connection between indigenous peoples, local communities and biodiversity conservation. It also helps people around the world have an awareness of ICCAs when they make decisions. However, communities should also consider whether they might face challenges as a result of making their information public. More information on potential benefits, and important issues to consider, is available at http://www.iccaregistry.org/en/participate/benefits-and-considerations.
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
    title: 'Draw your ICCA with Mapeo Desktop',
    description:
      'Back in your community you can sync your points with Mapeo Desktop to get them onto a laptop, and use them to draw the ICCA boundary.',
    image: require('../assets/mapeo-sync-screen.png'),
    moreLink: 'What to do next?',
    moreTitle: 'What to do next?',
    moreText: `
Once you have the points you have collected with Mapeo Mobile synchronized with Mapeo Desktop you can use these points together with satellite imagery to draw the ICCA boundary.

There are five stages to providing information:

1. Start creating a digital boundary of the ICCA in Mapeo Desktop.
2. Refine and agree upon the digital boundary. This should be done in participation with as many members of the community as possible, including different groups within the community.
3. Complete the questions in Mapeo Desktop. This should be done in participation with as many members of the community as possible, including different groups within the community.
4. Collectively agree upon the information to be shared with UNEP-WCMC.
5. Share the agreed information with UNEP-WCMC.
`,
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
After you have provided information using Mapeo, the following steps will be taken before the information is made public:

1. A member of staff from UNEP-WCMC will contact you with any questions;
2. UNEP-WCMC will send the information for other indigenous peoples and/or local communities to review. This peer-review process is in place to ensure that the information published in the databases is accurate. Peer-review is carried out by other indigenous peoples and/or local communities, and sometimes facilitating organisations, in the country where the ICCA is located. The process is defined by the indigenous peoples and local communities involved, meaning that it works differently in different countries. If you would like to know whether a process has been developed in your country, please contact mailto:iccaregistry@unep-wcmc.org. We can also advise you on what to do if a process has not yet been developed in your country.
`,
  },
  {
    backgroundColor: '#fc9f14',
    title: 'Enjoy Mapeo!',
    description: 'Tap the tick to start using Mapeo.',
    image: require('../assets/undraw_High_five_u364.png'),
    moreLink: 'More help',
    moreText: `
If you have any trouble contact UNEP-WCMC: mailto:iccaregistry@unep-wcmc.org
`,
  },
]

export default wcmcScreens
