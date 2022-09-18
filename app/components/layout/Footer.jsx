import { Link } from "@remix-run/react";

import Anchor from "../ui/Anchor";
import Container from "./Container";

export default function Footer() {
  return (
    <div className="border-t border-neutral-800/50 bg-white/5 py-4 flex flex-col items-stretch justify-start">
      <Container
        as="footer"
        className="flex flex-col items-stretch justify-start gap-2"
      >
        <p className="text-sm text-center">
          We welcome support inquiries and feedback at{" "}
          <Anchor href="mailto:jobilistcom@gmail.com">
            jobilistcom@gmail.com
          </Anchor>
          .
        </p>
        <p className="text-xs text-center text-neutral-400">
          Build by{" "}
          <Anchor
            href="https://twitter.com/VaibhavAcharya_"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vaibhav Acharya
          </Anchor>{" "}
          and{" "}
          <Anchor
            href="https://twitter.com/naman404"
            target="_blank"
            rel="noopener noreferrer"
          >
            Naman Vyas
          </Anchor>
          .
        </p>
        <ul className="flex flex-row items-center justify-center gap-2 text-xs">
          <li className="">
            <Anchor as={Link} to="/legal/privacy">
              Privacy policy
            </Anchor>
          </li>
          <li className="">
            <Anchor as={Link} to="/legal/privacy#contact">
              Contact Us
            </Anchor>
          </li>
        </ul>
        <div className="hidden" aria-hidden="true">
          <Anchor
            href="https://vaibhavacharya.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vaibhav Acharya
          </Anchor>
          <Anchor
            href="https://www.namanvyas.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Naman Vyas
          </Anchor>
        </div>
        {/* <div className="flex flex-row items-center justify-center flex-wrap gap-4">
          <Anchor
            styled={false}
            href="https://www.producthunt.com/posts/jobilist?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-jobilist"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=345426&theme=dark"
              alt="Jobilist - The&#0032;only&#0032;job&#0032;board&#0032;you&#0032;will&#0032;ever&#0032;need&#0046; | Product Hunt"
              width={96}
              height={22}
            />
          </Anchor>
        </div> */}
        <p className="text-xs text-center text-neutral-400">
          &copy; Jobilist, 2022
        </p>
      </Container>
    </div>
  );
}
