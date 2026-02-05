import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Mail, X } from "lucide-react";
import type { Product } from "@/modules/catalog/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProductDetailModal = ({ product, open, onOpenChange }: ProductDetailModalProps) => {
  if (!product) return null;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, me interesa obtener información sobre: ${product.title}`
    );
    window.open(`https://wa.me/573001234567?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Cotización: ${product.title}`);
    const body = encodeURIComponent(
      `Hola,\n\nMe interesa obtener información y cotización del producto:\n\n${product.title}\n\nQuedo atento a su respuesta.`
    );
    window.open(`mailto:ventas@opingenieria.com?subject=${subject}&body=${body}`, "_blank");
  };

  // Función para obtener el nombre de la categoría (simulación)
  const getCategoryName = () => {
    // En un caso real, esto vendría de un contexto o servicio
    return product.categoryId || "Sin categoría";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-heading pr-8">
            {product.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detalles del producto {product.title}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary product-detail-image">
            <img
              src={product.images?.[0] || "/placeholder-product.jpg"}
              alt={product.title}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== "/placeholder-product.jpg") {
                  target.src = "/placeholder-product.jpg";
                }
              }}
              className="w-full h-full object-contain block"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm">
              {getCategoryName()}
            </Badge>

            {product.price && (
              <p className="text-2xl font-bold text-accent">{product.price}</p>
            )}

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button onClick={handleWhatsApp} className="flex-1 gap-2 bg-accent hover:bg-accent/90">
                <MessageCircle className="h-4 w-4" />
                Cotizar por WhatsApp
              </Button>
              <Button onClick={handleEmail} variant="outline" className="flex-1 gap-2">
                <Mail className="h-4 w-4" />
                Cotizar por Email
              </Button>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="mt-6">
          <h4 className="font-heading font-semibold text-lg mb-3">
            Especificaciones Técnicas
          </h4>
          <div className="bg-secondary rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody>
                {product.specs && product.specs.map((spec, index) => (
                  <tr
                    key={spec.label}
                    className={index % 2 === 0 ? "bg-secondary" : "bg-muted/50"}
                  >
                    <td className="px-4 py-3 font-medium text-foreground">
                      {spec.label}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-right">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;