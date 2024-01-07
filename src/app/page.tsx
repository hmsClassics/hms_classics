import styles from './page.module.scss'
import { H1, H2 } from './components/Typography/Headings'
import P from './components/Typography/Paragraph'
import Video from './components/Video'
import Img from './components/Image'
import { ThreeByOne, TwoByOne } from './components/MediaGrids'
import Header from './components/Header'

export default function Home() {
  return (
    <>
      <Header hero={true} title={'Good vibes and sweet rides'} />
      {/* <Header /> */}
      <main className={styles.main}>
        <div className={styles.content_wrapper}>
          <H1>Your Gateway to Exquisite BMW, VW, and Porsche Masterpieces</H1>
          <P>
            Welcome to HMS Classics, the ultimate destination for classic BMW,
            VW, and Porsche enthusiasts. Our mission is simple yet profound: to
            connect you with the timeless elegance of meticulously restored
            vehicles, each holding a story waiting to be continued by you.
          </P>

          <H2>Our Collection</H2>
          <TwoByOne>
            <Img
              src="/images/vw_landscape.jpg"
              alt="some silly stuff"
              width={1920}
              height={1200}
            />
            <Img
              src="/images/bmw-m5-cs-milandscape.jpg"
              alt="some silly stuff"
              width={1920}
              height={1200}
            />
          </TwoByOne>

          <ThreeByOne>
            <Img
              src="/images/bmw-m4-csl-mi_landscape.jpg"
              alt="bwm"
              width={1920}
              height={1200}
            />
            <Img
              src="/images/porche_924_landscape.jpg"
              alt="some silly stuff"
              width={1920}
              height={1200}
            />
            <Img
              src="/images/bmw-xm-mi_landscape.jpg"
              alt="some silly stuff"
              width={1920}
              height={1200}
            />
          </ThreeByOne>

          <TwoByOne>
            <Img
              src="/images/bmw_portrait.jpg"
              alt="some silly stuff"
              width={1200}
              height={1920}
            />
            <Img
              src="/images/kiwi_portrait.jpg"
              alt="some silly stuff"
              width={1200}
              height={1920}
            />
          </TwoByOne>

          <H2>Invitation to Connect</H2>
          <P>Let&apos;s Journey Together</P>
          <P>
            <code>[contact form here]</code>
          </P>

          <H2>Highlight Reel</H2>
          <Video />

          <H2>Our Story</H2>
          <P>
            Rooted in a Lifelong Passion - From Childhood Dreams to Reality Meet
            James, the heart and soul of HMS Classics. As a child, the allure of
            a classic VW GT4 sparked a lifelong passion, evolving over the years
            from owning a thrilling VW Golf R to establishing this haven for
            classic car aficionados. It&apos;s not just about cars; it&apos;s
            about reigniting the romance of the road, the legacy of design, and
            the joy of a perfectly engineered ride.
          </P>
          <Img
            src="/images/vw-van_landscape.jpg"
            alt="some silly stuff"
            width={1920}
            height={1200}
          />

          <H2>What We Do</H2>
          <P>
            Unearthing Hidden Gems - Restoring Classics to Pristine Glory We
            specialize in discovering rare, classic BMWs, VWs, and Porsches, and
            transforming them into pristine examples of automotive art. Our
            thorough process ensures each vehicle is not only a visual spectacle
            but also a reliable companion for the road ahead.
          </P>

          <H2>Our Promise</H2>
          <P>Driven by Integrity - Deals That Delight</P>
          <P>
            For us, every deal is more than a transaction. It&apos;s a testament
            to our dedication to excellence, transparency, and building lasting
            relationships. We&apos;re committed to finding the perfect match for
            each client, ensuring that every deal is a win-win.
          </P>

          <H2>Experience the Difference</H2>
          <P>Explore Our Collection - Connect with Classics</P>
          <P>
            Delve into our curated collection of classic BMWs, VWs, and
            Porsches. Whether you&apos;re seeking the elegance of a vintage
            model or the thrill of a limited-edition release, we&apos;re here to
            guide you every step of the way.
          </P>

          <P>
            Your dream car awaits. Contact us to embark on a journey where
            history, craftsmanship, and passion converge. At HMS CLassics,
            we&apos;re not just selling cars; we&apos;re crafting experiences,
            fostering connections, and celebrating the timeless beauty of
            classic automobiles.
          </P>
        </div>
      </main>
    </>
  )
}
