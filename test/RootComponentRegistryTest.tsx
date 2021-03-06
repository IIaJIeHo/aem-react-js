import {expect} from "chai";

import "./setup";
import * as React from "react";
import ServerRenderer from "../ServerRenderer";
import {Container} from "../di/Container";
import {ServerResponse} from "../ServerRenderer";
import {Cq} from "../references";
import RootComponentRegistry from "../RootComponentRegistry";
import {ResourceComponent} from "../component/ResourceComponent";
import Cache from "../store/Cache";
import ComponentRegistry from "../ComponentRegistry";
import {Mapping} from "../RootComponentRegistry";
import ComponentManager from "../ComponentManager";

describe("RootComponentRegistry", () => {

    class TestView extends ResourceComponent<any, any, any> {
        public renderBody(): React.ReactElement<any> {
            return (<span>{this.getResource().text}</span>);
        }
    }

    let actualResourceType: string = "/components/test-view";

    it("should register component", () => {


        let rootRegistry: RootComponentRegistry = new RootComponentRegistry();
        let registry: ComponentRegistry = new ComponentRegistry("/components");
        registry.register(TestView);
        rootRegistry.add(registry);
        rootRegistry.init();

        let component: any = rootRegistry.getComponent(actualResourceType);
        expect(component).to.equal(TestView);

        component = new ComponentManager(rootRegistry, null).getComponent(actualResourceType);
        expect(component).to.equal(TestView);

        let resourceType: string = rootRegistry.getResourceType(TestView);
        expect(resourceType).to.equal(actualResourceType);

        resourceType = new ComponentManager(rootRegistry, null).getResourceType(TestView);
        expect(resourceType).to.equal(actualResourceType);

    });

    it("should register vanilla component", () => {


        let rootRegistry: RootComponentRegistry = new RootComponentRegistry();
        let registry: ComponentRegistry = new ComponentRegistry("/components");
        registry.registerVanilla({component: TestView});
        rootRegistry.add(registry);
        rootRegistry.init();

        let component: any = rootRegistry.getComponent(actualResourceType);
        expect(component).to.not.be.null;

        let resourceType: string = rootRegistry.getResourceType(TestView);
        expect(resourceType).to.be.undefined;

    });

});

