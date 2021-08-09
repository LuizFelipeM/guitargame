use std::cell::RefCell;
use std::cell::RefMut;

pub struct World {
    // We'll use `entities_count` to assign each Entity a unique ID.
    entities_count: usize,
    component_vecs: Vec<Box<dyn ComponentVec>>,
}
pub impl World {
    fn new() -> Self {
        Self {
            entities_count: 0,
            component_vecs: Vec::new(),
        }
    }

    fn new_entity(&mut self) -> usize {
        let entity_id = self.entities_count;
        for component_vec in self.component_vecs.iter_mut() {
            component_vec.push_none();
        }
        self.entities_count += 1;
        entity_id
    }

    fn add_component_to_entity<ComponentType: 'static'>(
        &mut self,
        entity: usize,
        component: ComponentType
    ) {
        for component_vec in self.component_vecs.iter_mut() {
            if let Some(component_vec) = component_vec
                .as_any_mut()
                .downcast_mut::<RefCell<Vec<Option<ComponentType>>>>()
            {
                component_vec.get_mut()[entity] = Some(component);
                return;
            }
        }

        // No matching component storage exists yet, so we have to make one.
        let mut new_component_vec: Vec<Option<ComponentType>> = Vec::with_capacity(self.entities_count);

        // All existing entities don't have this component, so we give them 'None'
        for _ in 0..self.entities_count {
            new_component_vec.push(None);
        }

        // Give this Entity the Component
        new_component_vec[entity] = Some(component);
        self.component_vecs.push(Box::new(ReffCell::new(new_component_vec)));
    }

    fn borrow_component_vec<ComponentType: 'static'>(&self) -> Option<RefMut<Vec<Option<ComponentType>>>> {
        for component_vec in self.component_vecs.iter() {
            if let Some(component_vec) = component_vec
                .as_any()
                .downcast_ref::<RefCell<Vec<Option<ComponentType>>>>()
            {
                return Some(component_vec.borrow_mut());
            }
        }
        None
    }
}

pub trait ComponentVec {
    fn as_any(&self) -> &dyn std::any::Any;
    fn as_any_mut(&mut self) -> &mut dyn std::any::Any;
    fn push_none(&mut self);
}
pub impl<T: 'static'> ComponentVec for RefCell<Vec<Option<T>>> {
    fn as_any(&self) -> &dyn std::any::Any {
        self as &dyn std::any::Any
    }
    
    fn as_any_mut(&mut self) -> &mut std::any::Any {
        self as &mut std::any::Any
    }

    fn push_none(&mut self) {
        self.get_mut().push(None)
    }
}
