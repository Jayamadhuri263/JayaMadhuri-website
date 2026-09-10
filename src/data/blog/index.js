import { blogPosts as originalPosts, blogCategories } from '../blogPosts.js';
import { angularArticles } from './articles-angular.js';
import { reactArticles } from './articles-react.js';
import { firebaseArticles } from './articles-firebase.js';
import { mobileArticles } from './articles-mobile.js';
import { devopsArticles } from './articles-devops.js';
import { uiBankingArticles } from './articles-ui-banking.js';
import { postDates } from './postDates.js';

const additionalPosts = [
  ...angularArticles,
  ...reactArticles,
  ...firebaseArticles,
  ...mobileArticles,
  ...devopsArticles,
  ...uiBankingArticles,
];

function applyPublishDates(posts) {
  return posts.map((post) => ({
    ...post,
    date: postDates[post.id] ?? post.date,
  }));
}

export const allBlogPosts = applyPublishDates([...originalPosts, ...additionalPosts]).sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

export const allBlogCategories = [
  'All',
  'Architecture',
  'Angular',
  'React',
  'Frontend',
  'JavaScript',
  'Performance',
  'DevOps',
  'Mobile',
  'Firebase',
  'Full-Stack',
  'Banking',
];

export { blogCategories };
