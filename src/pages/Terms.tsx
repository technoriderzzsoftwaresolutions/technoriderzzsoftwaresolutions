import Layout from "@/components/layout/Layout";

const Terms = () => {
  return (
    <Layout>
      {/* Hero */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 md:py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Please read these terms carefully before using our services
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
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using the services provided by Techno Riderzz Software Solutions, you accept and agree 
              to be bound by the terms and conditions of this agreement. If you do not agree to abide by these terms, 
              please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Services</h2>
            <p className="text-muted-foreground mb-4">
              Techno Riderzz Software Solutions provides the following services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Custom project development for academic and professional purposes</li>
              <li>Online courses and training programs</li>
              <li>Internship programs</li>
              <li>Technical documentation services</li>
              <li>Software development and consultation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">
              As a user of our services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and complete information when registering</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use our services only for lawful purposes</li>
              <li>Not reproduce, duplicate, or resell our services without permission</li>
              <li>Respect intellectual property rights of all materials provided</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
            <p className="text-muted-foreground">
              All payments for projects, courses, and services must be made as per the agreed terms. Prices are subject 
              to change without notice. Refunds, if applicable, will be processed according to our refund policy and 
              may take 7-14 business days to reflect in your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, including but not limited to projects, course materials, documentation, and software, 
              provided by Techno Riderzz Software Solutions is protected by intellectual property laws. Users are 
              granted a limited, non-exclusive license to use these materials for personal or educational purposes only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Project Delivery</h2>
            <p className="text-muted-foreground">
              Projects will be delivered within the agreed timeframe. Delays may occur due to unforeseen circumstances, 
              and we will communicate any changes promptly. Revisions are limited as per the package selected. 
              Additional revisions may incur extra charges.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Techno Riderzz Software Solutions shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use of or inability to use our services. Our total liability shall 
              not exceed the amount paid by you for the specific service in question.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend your access to our services at any time, without prior notice, 
              for conduct that we believe violates these terms or is harmful to other users, us, or third parties, or 
              for any other reason at our sole discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting 
              on our website. Your continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms & Conditions, please contact us at:
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

export default Terms;
