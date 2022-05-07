import { Student } from "./promotion.service";

/** Renvoie la liste des promotions */
async function getPromotions(): Promise<string[]> {
  return new Promise( r => setTimeout(() => r(['L3M', 'L3INF', 'L3MIN']), 100) )
}

/** Renvoie la liste des id des étudiants de la promotion */
async function getIDsPromotion(promo: string): Promise<string[]> {
  return new Promise( r => setTimeout(() => r(['1', '2', '3']), 100) )
}

/** Renvoie le nom de l'étudiant ayant l'identifiant id */
async function getStudentName(id: string): Promise<string> {
  return new Promise( r => setTimeout(() => r(`bob ${id}`), 100) );
}

/** Renvoie le score de l'étudiant ayant l'identifiant id */
async function getStudentScore(id: string): Promise<number> {
  return new Promise( r => setTimeout(() => r(10), 100) );
}


interface Promotion {
  promo: string;
  students: Student[];
}

async function buildPromotions(): Promise<Promotion[]> {
  const LP = await getPromotions();
  return await Promise.all(
    LP.map( async promo => {
      const Lids = await getIDsPromotion(promo);
      const students: Student[] = await Promise.all(
        Lids.map( async id => ({
          id,
          name: await getStudentName(id),
          score: await getStudentScore(id)
        }))
      )
      return {promo, students};
    })
  )
}