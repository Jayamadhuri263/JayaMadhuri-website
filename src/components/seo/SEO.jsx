import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://jayamadhuri.dev';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export default function SEO({
  title = 'Jaya Madhuri | Frontend Developer — Enterprise Banking',
  description =
    'Frontend Developer at Intellect Design Arena: Angular CBX for Indian Bank, Cordova mobility for IDFC & Bank of Baroda. Live demos, tech blog, SPOT Award for biometric login.',
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  article = null,
}) {
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Jaya Madhuri Portfolio" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {article && (
        <>
          <meta property="article:published_time" content={article.date} />
          <meta property="article:author" content={article.author} />
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
}
