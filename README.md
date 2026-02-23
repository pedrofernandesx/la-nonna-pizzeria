# 🍕 La Nonna Pizzeria 🍕
> Uma experiência de pedido online imersiva, interativa e totalmente funcional.

<img width="1024" height="1024" alt="image" src="https://github.com/user-attachments/assets/d29abef0-bf39-4e94-bc8c-ec6219cafdba" />

Este projeto é uma landing page de alta conversão desenvolvida para pizzarias artesanais, focada em **Mobile-First UX** e **Performance**. O sistema permite que o usuário monte sua pizza de forma dinâmica, com validações em tempo real e fechamento de pedido via WhatsApp.

- **✅ Integração Real com WhatsApp:** Gera uma mensagem estruturada com todos os dados do pedido (sabores, endereço, pagamento e total).
- **🍕 Pizza Builder Dinâmico:** 
  - Lógica de limite de sabores baseada no tamanho (ex: Broto permite 1 sabor, GG permite até 4).
  - Feedback visual de erro com animações de "Shake" ao exceder limites.
  - Atualização automática de preço e contadores.
- **🛒 Checkout Otimizado (Thumb Zone):** 
  - Interface adaptada para uso com uma única mão.
  - Alternância inteligente entre "Entrega" e "Retirada na Loja".
- **🎨 UI de Alta Fidelidade:** Uso de imagens sangradas (bleed), tipografia moderna (`Pacifico` e `Poppins`) e micro-interações táteis.

- ## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico:** Para melhor acessibilidade e SEO.
- **CSS3 Moderno:** Flexbox, CSS Grid, Variáveis (Custom Properties) e Animações `@keyframes`.
- **JavaScript (Vanilla):** Lógica de estado complexa e manipulação de DOM sem dependências externas.

## 🧠 Desafios Técnicos & Soluções

O maior desafio foi criar um fluxo de montagem de pedido que fosse simples, mas seguro:
- **Estado Síncrono:** Desenvolvi uma lógica em JS para monitorar as escolhas do usuário e refletir instantaneamente no UI, garantindo que o valor final nunca esteja errado.
- **Feedback de Erro (UX):** Implementei o efeito "Shake Deny" no modal, proporcionando uma comunicação clara e moderna com o usuário, sem interromper a navegação com pop-ups irritantes.

- ---
Desenvolvido por **Pedro Fernandes** como demonstração de habilidades avançadas em Front-end Moderno. 🚀
