import styles from '../about/about.module.scss';
import imageSrc from '../../assets/Side Image.png';
import teamImages from './teamImages';
import Navigation from '../../components/navigation/nav';

interface TeamMember {
  name: string;
  imageSrc: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Norbert ISHIMWE', imageSrc: teamImages[0] },
  { name: 'Pacific NDUWUMWE', imageSrc: teamImages[1] },
  { name: 'Eric NSANZIMFURA', imageSrc: teamImages[3] },
  { name: 'Eddy MUGISHA', imageSrc: teamImages[4] },
  { name: 'Joseph NTWALI', imageSrc: teamImages[5] },
  { name: 'Said MIRINDI', imageSrc: teamImages[6] },
  { name: 'Prince INEZA', imageSrc: teamImages[7] },
  { name: 'Adrine UWERA', imageSrc: teamImages[2] },
];

function About_us() {
  return (
    <div className={styles.aboutUS}>
      <Navigation />
      <div className="wrapperDiv">
        <div className={styles.container}>
          <div className={styles.text}>
            <h2>Our Story</h2>
            <p data-testId="paragraph" className="paragraph">
              Welcome to our thriving e-commerce website, where we are dedicated to revolutionizing
              the way you shop online. At ShopSpree, we specialize in providing an exceptional
              shopping experience tailored to your unique needs. With an extensive range of
              high-quality products, spanning across various categories, we strive to cater to the
              diverse preferences of our valued customers. From fashion-forward clothing and
              accessories to cutting-edge electronics and innovative home appliances, we offer an
              extensive selection that ensures you can find precisely what you are looking for. Our
              user-friendly interface, coupled with seamless navigation, allows you to explore our
              virtual aisles effortlessly, saving you time and enhancing your shopping convenience.
              Moreover, we prioritize customer satisfaction and go the extra mile to ensure prompt
              deliveries and exceptional customer service. Discover the joy of hassle-free shopping
              with ShopSpree, where we make your online shopping dreams come true.
            </p>
          </div>
          <div className={styles.image}>
            <img src={imageSrc} alt="Image" className="img" />
          </div>
        </div>

        <div className={styles.team}>
          <h3>Team Members</h3>
          <div className={styles.photos}>
            {teamMembers.map((member, index) => (
              <div key={index}>
                <img src={member.imageSrc} alt="Team Member" />
                <p>{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About_us;
