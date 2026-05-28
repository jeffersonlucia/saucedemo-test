# Coding Standards — Flutter/Dart: WhiskeyCLUB

## Arquitetura: Clean Architecture + BLoC

```
features/
  [feature]/
    data/
      datasources/    ← API calls, local DB
      models/         ← JSON deserialization
      repositories/   ← Implementação dos contratos
    domain/
      entities/       ← Pure Dart classes (sem JSON)
      repositories/   ← Interfaces (contratos)
      usecases/       ← Regras de negócio
    presentation/
      bloc/           ← BLoC/Cubit + States + Events
      pages/          ← Telas completas
      widgets/        ← Componentes específicos da feature
```

## Convenções de Nomenclatura

```dart
// Arquivos: snake_case
// Classes: PascalCase
// Variáveis/funções: camelCase
// Constantes: kCamelCase

// BLoC
class CatalogBloc extends Bloc<CatalogEvent, CatalogState> {}
class CatalogCubit extends Cubit<CatalogState> {}

// States devem ser sealed ou abstract
sealed class CatalogState {}
final class CatalogInitial extends CatalogState {}
final class CatalogLoading extends CatalogState {}
final class CatalogLoaded extends CatalogState {
  final List<Whiskey> whiskies;
  const CatalogLoaded(this.whiskies);
}
final class CatalogError extends CatalogState {
  final String message;
  const CatalogError(this.message);
}

// Entities: imutáveis
class Whiskey extends Equatable {
  final String id;
  final String name;
  // ...
  
  @override
  List<Object?> get props => [id, name];
}
```

## Regras de Performance

```dart
// ✅ SEMPRE usar ListView.builder para listas
ListView.builder(
  itemCount: whiskies.length,
  itemBuilder: (context, index) => WhiskeyCard(whiskey: whiskies[index]),
)

// ❌ NUNCA usar ListView com children grandes
ListView(children: whiskies.map((w) => WhiskeyCard(w)).toList())

// ✅ Usar const onde possível
const WhiskeyCard(key: Key('card-1'));

// ✅ Cache de imagens com CachedNetworkImage
CachedNetworkImage(imageUrl: whiskey.imageUrl)

// ❌ Nunca Image.network sem cache
Image.network(whiskey.imageUrl)
```

## Testes

```dart
// Widget test obrigatório para cada Page e componente crítico
testWidgets('CatalogPage shows loading initially', (tester) async {
  when(() => catalogBloc.state).thenReturn(CatalogLoading());
  
  await tester.pumpWidget(
    BlocProvider.value(
      value: catalogBloc,
      child: const CatalogPage(),
    ),
  );
  
  expect(find.byType(CircularProgressIndicator), findsOneWidget);
});
```

## Acessibilidade

```dart
// Sempre adicionar Semantics em elementos interativos
Semantics(
  label: 'Botão de avaliação do whiskey ${whiskey.name}',
  button: true,
  child: IconButton(onPressed: onRate, icon: Icon(Icons.star)),
)
```

## Internacionalização

```dart
// Sempre usar AppLocalizations para textos
Text(AppLocalizations.of(context)!.whiskeyCatalogTitle)

// Nunca hardcodar strings em português ou inglês na UI
Text('Catálogo de Whiskies') // ❌
Text(l10n.catalogTitle) // ✅
```
