import { getProfileSection } from "@/utils/profileData";

export default function ContactSection() {
  // Get contact data from JSON file
  const contact = getProfileSection("contact");

  return (
    <section id="contact" className="py-20">
      <div className="container px-6 mx-auto">
        <h2 className="mb-12 text-3xl font-bold text-center">Get In Touch</h2>
        <div className="max-w-md mx-auto">
          <p className="mb-8 text-center">
            {`Let's build something amazing together! I specialize in full stack
            engineering, system architecture, and AI development. Whether you have
            a project idea, technical questions, or just want to connect, I'd love
            to hear from you.`}
          </p>
          <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
            <a
              href={`mailto:${contact.email}`}
              className="px-6 py-3 text-center text-white transition-colors bg-blue-600 rounded-full hover:bg-blue-700"
            >
              Send me an email
            </a>
            <a
              href={`tel:+${contact.phone.replace(/\s+/g, "")}`}
              className="px-6 py-3 text-center text-white transition-colors bg-green-600 rounded-full hover:bg-green-700"
            >
              Call me
            </a>
          </div>
          <div className="mb-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Phone: {contact.phone}
            </p>
          </div>
          <div className="flex justify-center mb-8 space-x-6">
            {/* GitHub */}
            {contact.socialLinks.github && (
              <div className="relative group">
                <a
                  href={contact.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <div className="absolute mb-2 transition-opacity duration-300 transform -translate-x-1/2 opacity-0 pointer-events-none bottom-full left-1/2 group-hover:opacity-100">
                  <div className="px-2 py-1 text-xs text-gray-800 rounded dark:text-white whitespace-nowrap">
                    GitHub
                    <div className="absolute transform -translate-x-1/2 border-4 border-transparent top-full left-1/2 border-t-gray-800 dark:border-t-white"></div>
                  </div>
                </div>
              </div>
            )}

            {/* LinkedIn */}
            {contact.socialLinks.linkedin && (
              <div className="relative group">
                <a
                  href={contact.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <div className="absolute mb-2 transition-opacity duration-300 transform -translate-x-1/2 opacity-0 pointer-events-none bottom-full left-1/2 group-hover:opacity-100">
                  <div className="px-2 py-1 text-xs text-gray-800 rounded dark:text-white whitespace-nowrap">
                    LinkedIn
                    <div className="absolute transform -translate-x-1/2 border-4 border-transparent top-full left-1/2 border-t-gray-800 dark:border-t-white"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Telegram */}
            {contact.socialLinks.telegram && (
              <div className="relative group">
                <a
                  href={contact.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <span className="sr-only">Telegram</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
                <div className="absolute mb-2 transition-opacity duration-300 transform -translate-x-1/2 opacity-0 pointer-events-none bottom-full left-1/2 group-hover:opacity-100">
                  <div className="px-2 py-1 text-xs text-gray-800 rounded dark:text-white whitespace-nowrap">
                    Telegram
                    <div className="absolute transform -translate-x-1/2 border-4 border-transparent top-full left-1/2 border-t-gray-800 dark:border-t-white"></div>
                  </div>
                </div>
              </div>
            )}

            {/* WhatsApp */}
            {contact.socialLinks.whatsapp && (
              <div className="relative group">
                <a
                  href={contact.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                >
                  <span className="sr-only">WhatsApp</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.5027 3.4873C18.2579 1.2425 15.2604 0 12.0504 0C5.4651 0 0.1008 5.3643 0.1008 11.9496C0.1008 14.0625 0.6488 16.1256 1.6948 17.9397L0 24L6.2056 22.3417C7.9526 23.2895 9.9832 23.7895 12.0504 23.7895H12.0599C18.6357 23.7895 24 18.4252 24 11.8399C24 8.6299 22.7575 5.6324 20.5027 3.4873ZM12.0504 21.78C10.2364 21.78 8.4619 21.2993 6.9138 20.4013L6.5535 20.1881L2.8393 21.1473L3.8176 17.5238L3.5854 17.1539C2.5966 15.5373 2.0774 13.7628 2.0774 11.9496C2.0774 6.4602 6.5609 1.9767 12.0599 1.9767C14.7045 1.9767 17.1789 3.0151 19.0327 4.8784C20.8866 6.7322 21.9346 9.2065 21.9346 11.8399C21.9346 17.3293 17.4511 21.78 12.0504 21.78ZM17.5125 14.4528C17.2138 14.3039 15.7345 13.5823 15.4548 13.4827C15.1752 13.3831 14.9756 13.3335 14.7761 13.6322C14.5766 13.931 14.0042 14.6029 13.8238 14.8025C13.6435 15.002 13.4728 15.0212 13.1645 14.8626C11.1242 13.8426 9.7865 13.0431 8.4392 10.7461C8.1021 10.198 8.6692 10.2284 9.2066 9.1536C9.3062 8.954 9.2566 8.7832 9.187 8.6344C9.1174 8.4855 8.5595 7.0061 8.3004 6.3896C8.051 5.7826 7.7921 5.8731 7.602 5.8624C7.4217 5.852 7.2318 5.852 7.0322 5.852C6.8327 5.852 6.5035 5.9216 6.2238 6.2204C5.9442 6.5191 5.173 7.2407 5.173 8.7201C5.173 10.1995 6.2436 11.6293 6.3931 11.8288C6.5426 12.0283 8.5497 15.1121 11.6231 16.4162C13.529 17.2035 14.2587 17.2716 15.1935 17.1423C15.7617 17.0625 16.9626 16.426 17.2217 15.7104C17.4808 14.9948 17.4808 14.3784 17.4017 14.2489C17.3321 14.1097 17.1326 14.0305 16.834 13.8914L17.5125 14.4528Z"
                    />
                  </svg>
                </a>
                <div className="absolute mb-2 transition-opacity duration-300 transform -translate-x-1/2 opacity-0 pointer-events-none bottom-full left-1/2 group-hover:opacity-100">
                  <div className="px-2 py-1 text-xs text-gray-800 rounded dark:text-white whitespace-nowrap">
                    WhatsApp
                    <div className="absolute transform -translate-x-1/2 border-4 border-transparent top-full left-1/2 border-t-gray-800 dark:border-t-white"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
