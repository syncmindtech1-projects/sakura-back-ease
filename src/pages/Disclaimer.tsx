import PageLayout from "@/components/PageLayout";
import LegalDoc from "@/components/LegalDoc";

const Disclaimer = () => (
  <PageLayout>
    <LegalDoc title="Disclaimer" lastUpdated="5 August 2026">
      <p>
        The information provided by JobSphere ("we," "us," "our") on jobsphere.net is for general
        informational purposes only. All information on the Site is provided in good faith; however,
        we make no representation or warranty of any kind, express or implied, regarding the
        accuracy, adequacy, validity, reliability, availability, or completeness of any information.
      </p>

      <h2>Job Listings Disclaimer</h2>
      <p>
        JobSphere is a platform that connects job seekers with employers. We do not guarantee job
        placement, interview outcomes, or the legitimacy of every listing, although we take
        reasonable steps to review postings. Job seekers should exercise due diligence, including
        researching employers independently, before providing personal or financial information or
        accepting any offer.
      </p>

      <h2>Advertising Disclaimer</h2>
      <p>
        Advertisements displayed on this Site, whether through Google AdSense or direct advertising
        partnerships, are the responsibility of the respective advertisers. JobSphere does not
        endorse and is not responsible for the products, services, or claims made by advertisers.
      </p>

      <h2>External Links Disclaimer</h2>
      <p>
        The Site may contain links to external websites not provided or maintained by JobSphere. We
        do not guarantee the accuracy or reliability of any information on these external sites.
      </p>

      <h2>Professional Advice Disclaimer</h2>
      <p>
        Content on this Site, including blog articles, does not constitute career, legal, or
        financial advice. Always seek the advice of a qualified professional regarding your specific
        situation.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Under no circumstance shall JobSphere be liable for any loss or damage of any kind incurred
        as a result of using the Site or reliance on any information provided.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about this Disclaimer can be sent to{" "}
        <a href="mailto:syncmindtech1@gmail.com">syncmindtech1@gmail.com</a>.
      </p>
    </LegalDoc>
  </PageLayout>
);

export default Disclaimer;
