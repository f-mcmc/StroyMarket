import Link from "next/link";
import { ImageOff } from "lucide-react";
import { CategoryTreeNode } from "@/lib/api/categoryTree";
import styles from "@/app/catalog/catalog.module.css";

/**
 * Сетка дочерних категорий (работает на любой глубине — компонент не знает, на каком
 * он уровне, просто рендерит node.children под переданным basePath). Backend не отдаёт
 * изображений категорий, поэтому вместо картинки — ImageOff-плейсхолдер.
 */
export default function CategoryLanding({ node, basePath }: { node: CategoryTreeNode; basePath: string }) {
  return (
    <>
      <h1 className={styles.pageTitle}>{node.name}</h1>

      {node.children.length === 0 ? (
        <p className="mt-6 text-sm text-neutral-500">
          В этой категории пока нет подкатегорий. Уточните ассортимент у менеджера по телефону{" "}
          <a href="tel:998000000000" className="font-semibold text-neutral-900 hover:text-blue-600">
            +998 00 000-00-00
          </a>
          .
        </p>
      ) : (
        <div className={styles.grid}>
          {node.children.map((child) => (
            <Link key={child.slug} href={`${basePath}/${child.slug}`} className={styles.cardLink}>
              <div className="flex h-32 w-full items-center justify-center text-neutral-300">
                <ImageOff className="h-10 w-10" />
              </div>
              <p className={styles.title2}>{child.name}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
