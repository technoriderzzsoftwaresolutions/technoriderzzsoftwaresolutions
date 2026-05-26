import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Your privacy is important to us
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-muted-foreground mb-6">
            <strong>Last Updated:</strong> January 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">
              At Techno Riderzz Software Solutions, we collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Create an account or register for our services</li>
              <li>Enroll in courses or internship programs</li>
              <li>Purchase projects or services</li>
              <li>Contact us for support or inquiries</li>
              <li>Subscribe to our newsletter</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
            <p className="text-muted-foreground">
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. 
              This does not include trusted third parties who assist us in operating our website, conducting our business, 
              or servicing you, so long as those parties agree to keep this information confidential.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
              storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Cookies</h2>
            <p className="text-muted-foreground">
              We use cookies to enhance your experience on our website. Cookies are small files that a site or its 
              service provider transfers to your computer's hard drive through your web browser that enables the site 
              to recognize your browser and capture certain information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Third-Party Links</h2>
            <p className="text-muted-foreground">
              Occasionally, we may include or offer third-party products or services on our website. These third-party 
              sites have separate and independent privacy policies. We have no responsibility or liability for the 
              content and activities of these linked sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <p className="text-muted-foreground">
                <strong>Techno Riderzz Software Solutions</strong><br />
                16-11-469/27, Beside State Bank of India, SBI Colony,<br />
                Moosarambagh, Hyderabad - 500036, Telangana<br />
                Email: technoriderzzsoftwaresolutions@gmail.com<br />
                Phone: +91 83408 19112
              </p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
