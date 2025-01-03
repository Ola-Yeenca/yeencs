import ReactGA from 'react-ga4';

export const initGA = (measurementId: string): void => {
  ReactGA.initialize(measurementId);
};

export const logPageView = (path: string): void => {
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (category: string, action: string, label?: string): void => {
  ReactGA.event({
    category,
    action,
    label
  });
};

export const logBlogView = (title: string, slug: string): void => {
  logEvent('Blog', 'view', `${title} (${slug})`);
};

export const logProjectView = (title: string): void => {
  logEvent('Project', 'view', title);
};

export const logContactSubmission = (): void => {
  logEvent('Contact', 'submit');
};

export const logSearch = (query: string): void => {
  logEvent('Search', 'perform', query);
};
