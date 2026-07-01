type AnimeModule = typeof import('animejs');
type AnimeParams = Parameters<AnimeModule['animate']>[1];

export function runAnimeReveal(
  animeModule: AnimeModule,
  elements: Array<Element | null | undefined>,
  params: AnimeParams
) {
  const targets = elements.filter((element): element is Element => element != null);
  if (targets.length === 0) return;
  animeModule.animate(targets, params);
}
