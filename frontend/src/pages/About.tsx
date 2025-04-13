import React from "react";

const leadership = [
  {
    name: "Triparna De Vreede, PhD",
    title: "Behavioral AI Lab Director",
    email: "tdevreede@usf.edu",
    link: "https://www.usf.edu/business/about/bios/de-vreede-triparna.aspx",
    description: "Leading research in behavioral AI and human-computer interaction at USF.",
  },
];

const graduateResearchers = [
  {
    name: "Chelsea Anestal",
    title: "Graduate Research Assistant — AI Platform Developer",
    email: "cta1@usf.edu",
    link: "https://linkedin.com/in/chelsea-a-695813191",
    description: "Developing the ResearchChat platform and supporting experimental deployments.",
  },
  {
    name: "Priyanka Prabakarrao",
    title: "Graduate Research Assistant",
    email: "priyankap25@usf.edu",
    link: "https://linkedin.com/in/priyankaprabakarrao",
    description: "Contributing to research design and analysis in human-computer interaction studies.",
  },
  {
    name: "Thomas Fife",
    title: "PhD Candidate — Graduate Research Assistant",
    email: "ptfife@usf.edu",
    link: null,
    description: "Focusing on advanced dialogue systems and experimental HCI workflows.",
  },
];

const undergraduateResearchers = [
  {
    name: "Mai Pham",
    title: "Undergraduate Research Assistant",
    email: null,
    link: null,
    description: "Supporting ongoing research tasks and behavioral data collection.",
  },
];

const collaborators = [
  {
    name: "Dr. Ryan Schuetzler",
    title: "Associate Professor, Brigham Young University",
    email: null,
    link: null,
    description: "Notable collaborator in AI-mediated communication research.",
  },
];

const ProfileCard = ({
  name,
  title,
  email,
  link,
  description,
}: {
  name: string;
  title: string;
  email: string | null;
  link: string | null;
  description: string;
}) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
    {email && (
      <p className="text-sm text-blue-600 dark:text-blue-400">
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    )}
    {link && (
      <p className="text-sm mt-1">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          View Profile
        </a>
      </p>
    )}
    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{description}</p>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="max-w-5xl px-6 py-10 mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        About ResearchChat
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        <strong>ResearchChat</strong> is an evolving platform designed to support tailored Human-Computer Interaction (HCI) research and foster collaborative exploration between students, scholars, and developers.
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">
        Our mission is to empower researchers with conversational tools that streamline data collection, accelerate feedback cycles, and enable the rapid prototyping of AI-driven experiments — all within a flexible and secure environment built for experimentation and discovery.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Lab Leadership
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {leadership.map((member) => (
          <ProfileCard key={member.name} {...member} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Graduate Research Assistants
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {graduateResearchers.map((member) => (
          <ProfileCard key={member.name} {...member} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Undergraduate Research Assistants
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {undergraduateResearchers.map((member) => (
          <ProfileCard key={member.name} {...member} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Notable Collaborators
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collaborators.map((collab) => (
          <ProfileCard key={collab.name} {...collab} />
        ))}
      </div>
    </div>
  );
};

export default About;

